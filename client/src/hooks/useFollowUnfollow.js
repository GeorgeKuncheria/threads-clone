import {useState} from 'react';
import useShowToast from './useShowToast.js';
import { useRecoilValue } from 'recoil';
import userAtom from './../atoms/userAtom.js';


const useFollowUnfollow = (user) => {
    const showToast=useShowToast();
    const currentUser=useRecoilValue(userAtom); 
    const [following,setFollowing]= useState(user.followers.includes(currentUser?._id));
    const [updating,setUpdating]= useState(false);
    




    const handleFollowUnfollow=async () => {
        if(!currentUser){
            showToast('Error',"Please Login to follow",'error');
            return
        }
        if (updating){
            return;
        }
        setUpdating(true);
        try{
            const res= await fetch(`/api/users/follow/${user._id}`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data= await res.json();
            if (data.error){
                showToast("Error",data.error,"error");
                return;
            }


            if (following){
                showToast("Success",`Unfollowed ${user.name}`,'success');
                user.followers.pop();
            }
            else{
                showToast("Success",`Following ${user.name}`,'success');
                user.followers.push(currentUser?._id);
            }

            setFollowing(!following)

        }
        catch(error){
            showToast("Error",`${error}`,"error");
        }
        finally{
            setUpdating(false);
        }
    }

  return {handleFollowUnfollow,following,updating};
}

export default useFollowUnfollow