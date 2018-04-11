import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";
import querystring from "querystring";

let spotifyToken: any = undefined;

function getSpotifyToken() {
    const clientId = "f473daa3706f47a2a6b944aeef2355e0";
    const requestUrl = "https://accounts.spotify.com/api/token";
    return new Promise((resolve, reject) => {
        axios.create({
            headers: {
                "Authorization": `Basic ${Buffer.from(clientId + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .post(requestUrl, querystring.stringify({ grant_type: "client_credentials" } ))
        .then((response: any) => { resolve(response.data.access_token); })
        .catch((error) => { reject(error); });
    });
}

export async function getSongs(req: Request, res: Response) {
    if (!spotifyToken) {
        spotifyToken = await getSpotifyToken();
    }

    console.log(spotifyToken);
    const requestUrl = `https://api.spotify.com/v1/search?q=${req.query.grant_type}&type=track`;

    axios.create({
        headers: {
            "Authorization": `Bearer ${spotifyToken}`
        }
    })
    .get(requestUrl)
    .then((response) => { res.send(response.data.tracks.items); })
    .catch((error) => { console.log("getSpotifySongs error"); });
}
