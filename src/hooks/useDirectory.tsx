import { communityState } from "@/atoms/communitiesAtom";
import { DirectoryMenuItem, DirectoryMenuState } from "@/atoms/directoryAtom";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState(prev => ({
            ...prev,
            selectedMenuItem: menuItem
        }))
        router.push(menuItem.link)
        if(directoryState.isOpen){
            toggleMenuOpen();
        }
    }

    const toggleMenuOpen = () => {
        setDirectoryState(prev => ({
            ...prev,
            isOpen: !directoryState.isOpen
        }))
    }

    useEffect(() => {

        const {currentCommunities} = communityStateValue
        if(currentCommunities){
            setDirectoryState(prev => ({
                ...prev,
                selectedMenuItem: {
                    displayText: `r/${currentCommunities.id}`,
                    link: `/r/${currentCommunities.id}`,
                    imageURL: currentCommunities.imageURL,
                    icon: FaReddit,
                    iconColor: 'blue.500',
                }
            }))
        }
        
    },[communityStateValue.currentCommunities])

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
