
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
    // allows to add a loading state to the page (not on the page you are loading)
    // const navigation = useNavigation();

    return <>
        <MainNavigation />
        <main>
            {/* {navigation.state === "loading" && <p>Loading ...</p>} */}
            <Outlet />
        </main>
    </>
}