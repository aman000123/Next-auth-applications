
import { getServerSession } from 'next-auth/next';
//session se through hm seession se user id name nikal sakte hain
//session ko wrap kiya ha
import { authOptions } from '../auth/[...nextauth]/options';
import Connect from '@/connetc/dbconnetc';
import UserModel from '@/models/user';
import { User } from 'next-auth';

export async function POST(request) {
    // Connect to the database
    await Connect();

    //jo currently logged in user hai wo toggle kar paye accept karega ki nhi

    const session = getServerSession(authOptions)//this methods gives sessions
    console.log("seesions", session)

    const user = session?.user;
    console.log("session user", user);

    //if session me user nhi hoga means user login hai hi nhi
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();
    try {
        // Update the user's message acceptance status
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }//==>new updated value return karega 
        );

        if (!updatedUser) {
            // User not found
            return Response.json(
                {
                    success: false,
                    message: 'Unable to find user to update message acceptance status',
                },
                { status: 404 }
            );
        }

        // Successfully updated message acceptance status
        return Response.json(
            {
                success: true,
                message: 'Message acceptance status updated successfully',
                updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error updating message acceptance status' },
            { status: 500 }
        );
    }
}



export async function GET(request) {
    // Connect to the database
    await Connect();

    // Get the user session
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Check if the user is authenticated
    if (!session || !user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }


    try {
        // Retrieve the user from the database using the ID
        const foundUser = await UserModel.findById(user._id);
        if (!foundUser) {
            // User not found
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Return the user's message acceptance status
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessage,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error retrieving message acceptance status' },
            { status: 500 }
        );
    }



}