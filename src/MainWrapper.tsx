/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";

import RootNavigator from "@/navigation/AppContainer";
import useEffectOnce from "react-use/lib/useEffectOnce";
import globalPlayer from "@/service/playerService";
import messageSystem from "@/service/messageSystem";

import { useCurrentUser } from "./store/user/hooks";
import {
	setCurrentUser,
	getAllUsers,
	getResults,
	getResultsMonthly,
} from "./store/user/function";
import { getAllPodcasts } from "./store/podcast/functions";
import storage from "./service/localStorage";
import { checkUpdate } from "./service/util";

const MainAppScreen = () => {
	const currentUser = useCurrentUser();

	const status = useAsync(async () => {
		const user = await storage.getCurrentUser();
		return await setCurrentUser(user);
	}, []);

	useEffectOnce(() => {
		globalPlayer.init();
		!__DEV__ && checkUpdate();
	});

	useEffect(() => {
		getAllUsers();
		getAllPodcasts();
		getResults();
		getResultsMonthly();
    }, []);
    

    useEffect(()=>{
        if(currentUser){
            messageSystem.init(currentUser);
        }
    },[currentUser])

	return (
		<React.Fragment>
			{status.loading ? <LoadingComponent /> : <AppContainer />}
		</React.Fragment>
	);
};

const AppContainer = createAppContainer(RootNavigator);

export default MainAppScreen;
