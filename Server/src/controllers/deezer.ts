import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";


export async function getSongs(req: Request, res: Response) {
    console.log("deezer");
    axios.get(`https://api.deezer.com/search?q=${req.query.grant_type}`)
    .then(resp => { res.send(resp.data.data); })
    .catch(() => { console.log("getDeezerSongs error"); });
}
