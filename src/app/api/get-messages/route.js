import { getServerSession } from 'next-auth/next';
//session se through hm seession se user id name nikal sakte hain
//session ko wrap kiya ha
import { authOptions } from '../auth/[...nextauth]/options';
import Connect from '@/connetc/dbconnetc';
import UserModel from '@/models/user';
import { User } from 'next-auth';
import mongoose from 'mongoose';

export async function GET(request) {
    await Connect()
    //check login or not
    const session = await getServerSession(authOptions);
    const _user = session?.user;

    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    //const userId = user._id  ye string me mil raha seeeion option se

    //so change in mongoose object id
    const userId = new mongoose.Types.ObjectId(_user._id);
    //aggregation me issue aa ta bina convert kiye

    try {
        //sare msg get karne hai
        //aggregation pipe line
        //kai user  hai hmare pass
        //but hmre pass to abhi 1 hi user hai jisme msg la array h

        //array return karne pr kai 100 msg ho sakte hai

        //so hme array pura return kane ke bjay msg extract karne me aggrigaion pipeline use karte hai

        //multiple document lena h

        //  await UserModel.aggregate([{1st pipe line  1st me kewal user ki id ko matchbcz bhut sare user hain},
        //{2nd pipe line   me  unvind == id match ke bad msg array me hai pipeline anvind ki lagate hai to ye pipeline array me hi lgti ji array ko open kar deta hai  ///isses hm msg ko sort bhi kar sakter

        //aosi pipe line arrays ke upr lgti },
        //{3 rd pipe line  ==> sort kar sakete hai}])
        //{4rt pipeline=====>}
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: '$messages' }, { $sort: { 'messages.createdAt': -1 } },//yahn documents bikhre hue milte hain
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },//grping karke bhejte
        ])//.exec()//

        console.log("user after aggreagtion", user)
        if (!user || user.length === 0) {
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }
        return Response.json(
            { messages: user[0].messages },
            {
                status: 200,
            }
        );

    } catch (error) {

    }




}