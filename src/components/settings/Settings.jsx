import { UsersModify } from "../users/UserModify";
import { useUserSettings } from "../../shared/hooks/useUserSetting";
import Loading from "../Loading";

export const Settings = () => {

    const { userSettings, isFetching, saveSettings } = useUserSettings();

    if(isFetching){
        return <Loading />
    }

    return (
        <UsersModify settings={userSettings} saveSettings={saveSettings} />
    )
}