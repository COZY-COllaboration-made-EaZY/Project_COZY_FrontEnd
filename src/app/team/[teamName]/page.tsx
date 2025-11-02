import {redirect} from "next/navigation";

export default function TeamPageRedirect({ params } : { params:{teamName: string}}){
    redirect(`/team/${params.teamName}/dashboard`);
}