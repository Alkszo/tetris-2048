import React, { useEffect, useState } from 'react';
import Block from './Block';

const Board = () => {
    //const rows = [1, 2, 3, 4, 5, 6, 7, 8]
    const [blocks, setBlocks] = useState([{id: 'a1', active: false, value: null}, {id: 'a2', active: false, value: null}, {id: 'a3', active: false, value: null}, {id: 'a4', active: false, value: null},
    {id: 'a5', active: false, value: null}, {id: 'a6', active: false, value: null}, {id: 'a7', active: false, value: null}, {id: 'a8', active: false, value: null},
    {id: 'b1', active: false, value: null}, {id: 'b2', active: false, value: null}, {id: 'b3', active: false, value: null}, {id: 'b4', active: false, value: null}, 
    {id: 'b5', active: false, value: null}, {id: 'b6', active: false, value: null}, {id: 'b7', active: false, value: null}, {id: 'b8', active: false, value: null}, 
    {id: 'c1', active: false, value: null}, {id: 'c2', active: false, value: null}, {id: 'c3', active: false, value: null}, {id: 'c4', active: false, value: null}, 
    {id: 'c5', active: false, value: null}, {id: 'c6', active: false, value: null}, {id: 'c7', active: false, value: null}, {id: 'c8', active: false, value: null}, 
    {id: 'd1', active: false, value: null}, {id: 'd2', active: false, value: null}, {id: 'd3', active: false, value: null}, {id: 'd4', active: false, value: null},
    {id: 'd5', active: false, value: null}, {id: 'd6', active: false, value: null}, {id: 'd7', active: false, value: null}, {id: 'd8', active: false, value: null},])

    const tick = () => {
        const startingPositions = [0, 8, 16, 24]
        console.log('robiem cos');
        let ublocks = JSON.parse(JSON.stringify(blocks));
        for (let i = ublocks.length - 1; i>=0; i--) {
            if(ublocks[i].active) {
                if(ublocks[i].id[1] !== '8' && !ublocks[i+1].value) {
                    ublocks[i].active = false;
                    ublocks[i+1].value = ublocks[i].value;
                    ublocks[i].value = null;
                    ublocks[i+1].active = true;
                } else {
                    ublocks[i].active = false;
                }
            }
        }
        if(ublocks[0].value || ublocks[8].value || ublocks[16].value || ublocks[24].value) {
            console.log('KONIEC')
        }
        if (!ublocks.some(bl => bl.active)) {
            const randomStart = startingPositions[Math.floor(Math.random() * 4)]
            ublocks[randomStart].active = true;
            ublocks[randomStart].value = Math.pow(2, Math.floor(Math.random() * 6));
        }

        setBlocks(ublocks)
    }

    

    return(        
    <div className="board">
        {blocks.map(block => <Block identifier={block.id} activity={block.active} value={block.value} key={block.id}/>)}
    </div>
    )
}

export default Board;

//<div className={`block b${row} active`}>
//<Block identifier={`b${row}`}/><Block identifier={`c${row}`}/><Block identifier={`d${row}`}/></></div></div>
/*
{id: 'a1', active: false}, {id: 'a2', active: false}, {id: 'a3', active: false}, {id: 'a4', active: false},
{id: 'a5', active: false}, {id: 'a6', active: false}, {id: 'a7', active: false}, {id: 'a8', active: false},
{id: 'b1', active: false}, {id: 'b2', active: false}, {id: 'b3', active: false}, {id: 'b4', active: false}, 
{id: 'b5', active: false}, {id: 'b6', active: false}, {id: 'b7', active: false}, {id: 'b8', active: false}, 
{id: 'c1', active: false}, {id: 'c2', active: false}, {id: 'c3', active: false}, {id: 'c4', active: false}, 
{id: 'c5', active: false}, {id: 'c6', active: false}, {id: 'c7', active: false}, {id: 'c8', active: false}, 
{id: 'd1', active: false}, {id: 'd2', active: false}, {id: 'd3', active: false}, {id: 'd4', active: false},
{id: 'd5', active: false}, {id: 'd6', active: false}, {id: 'd7', active: false}, {id: 'd8', active: false},

{id: 'a1', active: false}, {id: 'b1', active: true}, {id: 'c1', active: false}, {id: 'd1', active: false},
        {id: 'a2', active: false}, {id: 'b2', active: false}, {id: 'c2', active: false}, {id: 'd2', active: false},
        {id: 'a3', active: false}, {id: 'b3', active: false}, {id: 'c3', active: false}, {id: 'd3', active: false},
        {id: 'a4', active: false}, {id: 'b4', active: false}, {id: 'c4', active: false}, {id: 'd4', active: false},
        {id: 'a5', active: false}, {id: 'b5', active: false}, {id: 'c5', active: false}, {id: 'd5', active: false},
        {id: 'a6', active: false}, {id: 'b6', active: false}, {id: 'c6', active: false}, {id: 'd6', active: false},
        {id: 'a7', active: false}, {id: 'b7', active: false}, {id: 'c7', active: false}, {id: 'd7', active: false},
        {id: 'a8', active: false}, {id: 'b8', active: false}, {id: 'c8', active: false}, {id: 'd8', active: false},]

        for(const block in blocks) {
            if(block.active) {
                block.active = false;
                blocks[blocks.indexOf(block) + 4].active = true;
                console.log(blocks)
                return
            }
        }


    useEffect(() => {
        setTimeout(tick, 1000) 
    }, [blocks])
*/