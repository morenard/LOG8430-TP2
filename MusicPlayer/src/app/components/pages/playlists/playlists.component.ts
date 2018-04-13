import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data.service';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { Playlist } from '../../../interfaces/playlist';
import { Song } from '../../../interfaces/song';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css',
  './../../../../../node_modules/primeng/resources/components/treetable/treetable.css']
})
export class PlaylistsComponent implements OnInit {

  // current playlist and its songs
  playlist: Playlist;
  playing = false;

  // treetable syntax
  nodes: TreeNode[];
  selectedNode: TreeNode;


  constructor(
    private sharedData: SharedDataService
  ) {

    // instantiate variables
    this.playlist = { name: 'Default', content: [] };
    this.nodes = [];
  }

  ngOnInit() {
    this.sharedData.currentPlaylist.subscribe(selectedPlaylist => this.updateNodes(selectedPlaylist));
    this.sharedData.playing.subscribe((onPlay) => { this.playing = onPlay; });
  }

  // update nodes --> songs of the playlist
  updateNodes(selectedPlaylist: Playlist) {
    // update value of local variable
    this.playlist = selectedPlaylist;
    this.nodes = [];

    // iterate over songs of playlist
    for (const song of this.playlist.content) {
      // create node for each song and add it to nodes variable
      const node: TreeNode = {
        data: {
          name: song.title,
          author: song.author,
          album: song.album
        },
        leaf: true
      };
      this.nodes.push(node);
    }
  }

  playSong(event) {
    // get song corresponding to the selected song
    const found: Song[] = this.playlist.content.filter(tmp => (tmp.title === this.selectedNode.data.name));

    // if there is at least one correspondance
    if (found.length > 0) {
      // if a song is already playing, we need to pause it first
      if (this.playing) {
        this.sharedData.play();
      }

      // play first correspondance (song)
      this.sharedData.changeCurrentSong(found[0]);
      this.sharedData.play();
    }
  }
}
