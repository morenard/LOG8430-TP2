import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";


export async function getSongs(req: Request, res: Response) {
    console.log("jamendo");
    axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=${req.query.client_id}&format=jsonpretty&limit=2&speed=high+veryhigh&include=musicinfo&namesearch=${req.query.grant_type}`)
    .then(resp => { res.send(resp.data.results); })
    .catch(() => { console.log("getJamendoSongs error"); });
}
