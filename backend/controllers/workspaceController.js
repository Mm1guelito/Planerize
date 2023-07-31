import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import mongoose from "mongoose";
import { io } from '../index.js'; // Replace the path with the correct path to your index.js file

// create workspace
export const createWorkspace = asyncHandler(async (req, res) => {
  try {
    //get token details
   
    const { title } = req.body;
    const user_id = req.user.userId;
    const newWorkspaceData = {
      title: title,
      user_id: user_id,
      members: [user_id],
      cards: []
    };
    const newWorkspace = new Workspace(newWorkspaceData);
    await newWorkspace.save();
    res.status(201).send({message: 'New Workspace Created', data: newWorkspace});
  } catch (error) {
    console.error('Failed to create workspace:', error);
    res.status(500).json({ message: 'Failed to create workspace' });
  }
});

//get workspaces based on logged in user
export const listAllWorkspace = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.userId;
    const userObjectId = new mongoose.Types.ObjectId(user_id);
    const workspaces = await Workspace.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "member_info"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "creator_info"
        }
      },
      {
        $match: {
          $or: [
            { "member_info._id": userObjectId }, // Check if the user_id is in the members array
            { "creator_info._id": userObjectId } // Check if the user_id is the creator of the workspace
          ]
        }
      },
      {
        $project: {
          "title": 1,
          "archived":1, 
          "member_info._id": 1,
          "member_info.name": 1,
          "member_info.email": 1,
          "creator_info._id": 1,
          "creator_info.name": 1,
          "creator_info.email": 1,
          "createdAt": 1,
          "updatedAt": 1,
        }
      }
    ]);
    res.status(200).json(workspaces);
  } catch (error) {
    console.error('Failed to fetch workspaces', error);
    res.status(500).json({message: 'Failed to fetch workspaces'})
  }
});

//invite members to workspace, must be registered
export const inviteUser = asyncHandler(async (req,res) => {
  try {
    const { workspace_id } = req.params;
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(409).json({ message: 'Email is not a registered account' });
    }
    const user_id = existingUser._id;
    const updatedWorkspace = await Workspace.updateOne({_id: workspace_id},
      { $addToSet: { members: user_id }});
    res.status(201).json({message: 'New member has been added', data: updatedWorkspace});
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ message: 'Failed to add member' });
  }
});

export const removeUser = asyncHandler(async (req, res) => {
  try {
    const { workspace_id, user_id } = req.params;
    const result = await Workspace.updateOne(
      { _id: workspace_id },
      { $pull: { members: user_id } }
    );
    res.status(200).json({message: 'Member has been removed', data: result});
  } catch (error) {
    console.error('Failed to remove member:', error);
    res.status(500).json({ message: 'Failed to remove member' });
  }
});

export const archiveWorkspace = asyncHandler(async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const result = await Workspace.updateOne(
      {_id: workspace_id},
      {$set: {archived: true}})
      res.status(200).json({message: 'Workspace has been archived', data: result});
  } catch (error) {
    console.error('Failed to archive workspace:', error);
    res.status(500).json({ message: 'Failed to archive workspace' });
  }
});

export const getWorkspaceCards = asyncHandler(async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const workspacesWithCardsAndDetails = await Workspace.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(workspace_id) }
      },
      {
        $lookup: {
          from: "cards",
          localField: "cards",
          foreignField: "_id",
          as: "card_data"
        }
      },
      {
        $project: {
          "title": 1,
          "archived":1, 
          "members":1,
          "card_data._id": 1,
          "card_data.title": 1,
          "card_data.description": 1,
          "card_data.status": 1,
          "card_data.delete": 1,
        }
      }
    ]);
    io.emit(`workspace: ${workspace_id}`, workspacesWithCardsAndDetails);
    res.status(201).json({ message: 'Fetch cards successful', data: workspacesWithCardsAndDetails });
  } catch (error) {
    console.error('Failed to fetch cards:', error);
    res.status(500).json({ message: 'Failed to fetch cards' });
  }
});

export const updateWorkpace = asyncHandler(async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const { title } = req.body;
    const result = await Workspace.updateOne(
      {_id: workspace_id},
      {$set: {title: title}})
    res.status(200).json({message: 'Workspace has been updated', data: result});
  } catch (error) {
    console.error('Failed to update workspace:', error);
    res.status(500).json({ message: 'Failed to update workspace' });
  }
});






