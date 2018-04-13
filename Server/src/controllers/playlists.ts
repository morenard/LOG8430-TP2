import { Request, Response } from "express";

export async function getPlaylists(req: Request, res: Response) {
    console.log("getPlaylists");
}

export async function addPlaylist(req: Request, res: Response) {
    console.log("addPlaylist");
}

export async function modifyPlaylist(req: Request, res: Response) {
    console.log("modifyPlaylist");
}

export async function removePlaylist(req: Request, res: Response) {
    console.log("removePlaylist");
}

