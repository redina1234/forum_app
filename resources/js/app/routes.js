import Categories from "./pages/categories";
import Forum from "./pages/forum";
import Thread from "./pages/thread";
import ThreadCreate from "./pages/thread.create";
import Search from "./pages/search";
import Register from "./pages/register";
import Login from "./pages/login";
import Njoftime from "./pages/njoftime";
import Bachelor from "./pages/bachelor";
import Master from "./pages/master";
import KerkimiShkencor from "./pages/kerkimi-shkencor"; //Bashkpunime karriera mungon ketu
import DocumentView from "./pages/document-view";
import njoftimeburse from "./pages/njoftimeburse";
import perjashtimtarifec1 from "./pages/perjashtimtarifec1";
import reduktimtarifec2 from "./pages/reduktimtarifec2";
// Tek pages nuk eshte?
//e fshiva un doja ta hiqja e ta vendosja prap
const routes = [
    { path: "/", component: Categories, name: "categories" },

    { path: "/forum/:id", component: Forum, name: "forum" },
    { path: "/thread/create", component: ThreadCreate, name: "thread.create" },
    { path: "/thread/:id", component: Thread, name: "thread" },

    { path: "/search", component: Search, name: "search" },

    { path: "/register", component: Register, name: "register" },
    { path: "/login", component: Login, name: "login" },
    { path: "/njoftime", component: Njoftime, name: "njoftime" },
    { path: "/bachelor", component: Bachelor, name: "bachelor" },
    { path: "/master", component: Master, name: "master" },
    {
        path: "/kerkimi-shkencor",
        component: KerkimiShkencor,
        name: "kerkimi-shkencor"
    },
    {
        path: "njoftimeburse",
        component: njoftimeburse,
        name: "njoftimeburse"
    },
    {
        path: "perjashtimtarifec1",
        component: perjashtimtarifec1,
        name: "perjashtimtarifec1"
    },
    {
        path: "reduktimtarifec2",
        component: reduktimtarifec2,
        name: "reduktimtarifec2"
    },

    { path: "*", redirect: "/" }
];

export default routes;
