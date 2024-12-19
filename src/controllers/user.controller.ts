// controller/api.ts
import { Request, Response } from 'express'
import { FetchUserData, UpdateUserData } from '@/repository/user'

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const updatedData = req.body

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

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const user = await FetchUserData(userId)
    if (user) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'User data fetched successfully!',
        user
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
