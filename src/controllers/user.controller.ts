import { Request, Response } from 'express'
import { CreateUserData, DeleteUserData, FetchUserData, UpdateUserData } from '../repository/user.repository'
import moment from 'moment'

export const fetchUsersData = async (req: Request, res: Response) => {
  try {
    const users = await FetchUserData()
    if (users) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Users data fetched successfully!',
        users
      })
    } else {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'User not found.'
      })
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Failed to fetch user data.'
    })
  }
}

export const createUserData = async (req: Request, res: Response) => {
  try {
    const userData = { ...req.body, created_at: moment(), updated_at: moment() }

    const newUser = await CreateUserData(userData)
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'User created successfully!',
      user: newUser
    })
  } catch (error) {
    console.error('Error creating user data:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Failed to create user data.'
    })
  }
}

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const updatedData = { ...req.body, updated_at: moment() }

    const updatedUser = await UpdateUserData(userId, updatedData)
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'User data updated successfully!',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user data:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Failed to update user data.'
    })
  }
}

export const deleteUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    await DeleteUserData(userId)
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'User deleted successfully!'
    })
  } catch (error) {
    console.error('Error deleting user data:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Failed to delete user data.'
    })
  }
}
