import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";

class Photo extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: null
        }
        this.MouseEnter = this.MouseEnter.bind(this);
        this.MouseLeave = this.MouseLeave.bind(this);
    }

    MouseEnter(i){
        this.setState({
            current: i
        })
    }
    MouseLeave(){
        this.setState({
            current: null
        })
    }
    render(){
        let {tileData} = this.props;
        let {current} = this.state;
        return(
            <div>
                <div style={style.root}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="title" color="inherit">
                                Photos
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={style.container}>
                        <GridList cellHeight={300} style={style.list} cols={4}>
                            {tileData.map((tile, index) =>
                                <GridListTile key={tile.url_n} onMouseEnter={() => this.MouseEnter(index)} onMouseLeave={this.MouseLeave}>
                                    <img src={tile.url_n} alt={tile.title} />
                                    { current === index && <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>by: {tile.ownername} <br/> views: {tile.views}</span>}/>
                                    }
                                </GridListTile>)
                            }
                        </GridList>

                </div>
            </div>
        )
    }
}

const style = {
    root: {
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    list: {
        width: 1200
    }
}

export  default  Photo;