import React, { useEffect, useState } from 'react';
import Block from './Block';

const Board = () => {
    const [blocks, setBlocks] = useState([{id: 'a1', active: false, value: null}, {id: 'a2', active: false, value: null}, {id: 'a3', active: false, value: null}, {id: 'a4', active: false, value: null},
    {id: 'a5', active: false, value: null}, {id: 'a6', active: false, value: null}, {id: 'a7', active: false, value: null}, {id: 'a8', active: false, value: null},
    {id: 'b1', active: false, value: null}, {id: 'b2', active: false, value: null}, {id: 'b3', active: false, value: null}, {id: 'b4', active: false, value: null}, 
    {id: 'b5', active: false, value: null}, {id: 'b6', active: false, value: null}, {id: 'b7', active: false, value: null}, {id: 'b8', active: false, value: null}, 
    {id: 'c1', active: false, value: null}, {id: 'c2', active: false, value: null}, {id: 'c3', active: false, value: null}, {id: 'c4', active: false, value: null}, 
    {id: 'c5', active: false, value: null}, {id: 'c6', active: false, value: null}, {id: 'c7', active: false, value: null}, {id: 'c8', active: false, value: null}, 
    {id: 'd1', active: false, value: null}, {id: 'd2', active: false, value: null}, {id: 'd3', active: false, value: null}, {id: 'd4', active: false, value: null},
    {id: 'd5', active: false, value: null}, {id: 'd6', active: false, value: null}, {id: 'd7', active: false, value: null}, {id: 'd8', active: false, value: null},])


    const adjustColumn = (emptyfield) => {
        const spacesAbove = emptyfield % 8;
        const columnTop = emptyfield - spacesAbove;
        let newColumn = JSON.parse(JSON.stringify([...blocks.slice(columnTop, emptyfield)]));
        for (const prop of newColumn) {
            let letter = prop.id[0]
            let num = Number(prop.id[1])
            num++
            prop.id = `${letter}${num}`
            console.log(prop.id)
        }
       // console.log(spacesAbove, columnTop)
        console.log(newColumn)
        setBlocks(oldBlocks => [...oldBlocks.slice(0, columnTop), {...oldBlocks[columnTop], active:false, value:null}, ...newColumn,
    ...oldBlocks.slice(emptyfield + 1, 32)])

    }

    const checkAdjacent = (ind) => {
        const val = blocks[ind].value;
        const left = blocks[ind - 8];
        const down = blocks[ind + 1];
        const right = blocks[ind + 8];
        const leftVal = left ? left.value : null;
        const downVal = down ? down.value : null;
        const rightVal = right ? right.value : null;
        if(downVal === val) {
            setBlocks(oldBlocks => [...oldBlocks.slice(0, ind), {...oldBlocks[ind], active: true, value: downVal * 2}, 
            {...down, value: null}, ...oldBlocks.slice(ind + 2, 32)])
        }
        if(leftVal === val) {
            setBlocks(oldBlocks => [...oldBlocks.slice(0, ind - 8), {...left, value: null}, ...oldBlocks.slice(ind - 7, ind),
                {...oldBlocks[ind], value: leftVal * 2}, ...oldBlocks.slice(ind + 1, 32)])
            adjustColumn(ind - 8)
        }
        if(rightVal === val) {
            setBlocks(oldBlocks => [...oldBlocks.slice(0, ind), {...oldBlocks[ind], value: rightVal * 2}, 
            ...oldBlocks.slice(ind + 1, ind + 8), {...right, value: null}, ...oldBlocks.slice(ind + 9, 32)])
            adjustColumn(ind + 8)
        }
    }

    useEffect(() => {
        const handleKeystroke = (e) => {
            const key = e.key;
            const activeBlock = blocks.find(bl => bl.active);
            const activeBlockID = blocks.indexOf(activeBlock);
            const moveLeft = () => {
                if(activeBlock.id[0] === 'a' || blocks[activeBlockID - 8].value) {
                    return
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID - 8), {...oldBlocks[activeBlockID - 8], value: activeBlock.value, active: true},
                ...oldBlocks.slice(activeBlockID - 7, activeBlockID), {...activeBlock, value: null, active: false}, ...oldBlocks.slice(activeBlockID + 1, 32)])
                }          
            }
            const moveRight = () => {
                if(activeBlock.id[0] === 'd' || blocks[activeBlockID + 8].value) {
                    return
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, value: null, active: false}, ...oldBlocks.slice(activeBlockID + 1, activeBlockID + 8),
                    {...oldBlocks[activeBlockID + 8], value: activeBlock.value, active: true}, ...oldBlocks.slice(activeBlockID + 9, 32)])
                }        
            }
            const moveDown = () => {
                if(activeBlock.id[1] === '8' || blocks[activeBlockID + 1].value) {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, active: false}, ...oldBlocks.slice(activeBlockID + 1, 32)])
                    checkAdjacent(activeBlockID)
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, value: null, active: false}, {...oldBlocks[activeBlockID + 1], value: activeBlock.value, active: true}, ...oldBlocks.slice(activeBlockID + 2, 32)])
                }    
            }
            if (!activeBlock) {
                return
            } else if(key === 'a' || key === 'ArrowLeft') {
                moveLeft()
            } else if(key === 'd' || key === 'ArrowRight') {
                moveRight()
            } else if(key === 's' || key === 'ArrowDown') {
                moveDown()
            } else {
                console.log('stupid key')
            }
        }
        window.addEventListener('keydown', handleKeystroke)

        return () => {
            window.removeEventListener('keydown', handleKeystroke)
        }
    }, [blocks])


    const tick = () => {
        const startingPositions = [0, 8, 16, 24];
        const activeBlock = blocks.find(bl => bl.active);
        const activeBlockID = blocks.indexOf(activeBlock);
        if(activeBlock){
            if(activeBlock.id[1] !== '8' && !blocks[activeBlockID + 1].value) {
                setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, value: null, active: false}, {...oldBlocks[activeBlockID + 1], value: activeBlock.value, active: true}, ...oldBlocks.slice(activeBlockID + 2, 32)])
            } else {
                setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, active: false}, ...oldBlocks.slice(activeBlockID + 1, 32)])
                checkAdjacent(activeBlockID)
                if(blocks[0].value || blocks[8].value || blocks[16].value || blocks[24].value) {
                    console.log('KONIEC')
                }
            }
        } else {
            const randomStart = startingPositions[Math.floor(Math.random() * 4)];
            const randomValue = Math.pow(2, Math.floor(Math.random() * 3));
            setBlocks(oldBlocks => [...oldBlocks.slice(0, randomStart), {...oldBlocks[randomStart], value: randomValue, active: true}, ...oldBlocks.slice([randomStart + 1], 32)])
        }
    }

    
    
    useEffect(() => {
        const int = setInterval(tick, 1000)
        
        return () => clearInterval(int)
    }, [blocks])

    const clickTest = () => {
        console.log('CLICK!')
    }
    return(
    <>
        <div>
            <button>Start!</button>
        </div>        
        <div className="board" onClick={clickTest}>
            {blocks.map(block => <Block identifier={block.id} activity={block.active} value={block.value} key={block.id}/>)}
        </div>
    </>
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

/*
useEffect(() => {
        const handleKeystroke = (e) => {
            const key = e.key;
            const activeBlock = blocks.find(bl => bl.active);
            const activeBlockID = blocks.indexOf(activeBlock);
            const moveLeft = () => {
                if(activeBlock.id[0] === 'a' || blocks[activeBlockID - 8].value) {
                    return
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID - 8), {...oldBlocks[activeBlockID - 8], value: activeBlock.value, active: true},
                ...oldBlocks.slice(activeBlockID - 7, activeBlockID), {...activeBlock, value: null, active: false}, ...oldBlocks.slice(activeBlockID + 1, 32)])
                }          
            }
            const moveRight = () => {
                if(activeBlock.id[0] === 'd' || blocks[activeBlockID + 8].value) {
                    return
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, value: null, active: false}, ...oldBlocks.slice(activeBlockID + 1, activeBlockID + 8),
                    {...oldBlocks[activeBlockID + 8], value: activeBlock.value, active: true}, ...oldBlocks.slice(activeBlockID + 9, 32)])
                }        
            }
            const moveDown = () => {
                if(activeBlock.id[1] === '8' || blocks[activeBlockID + 1].value) {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, active: false}, ...oldBlocks.slice(activeBlockID + 1, 32)])
                    checkAdjacent(activeBlockID)
                } else {
                    setBlocks(oldBlocks => [...oldBlocks.slice(0, activeBlockID), {...activeBlock, value: null, active: false}, {...oldBlocks[activeBlockID + 1], value: activeBlock.value, active: true}, ...oldBlocks.slice(activeBlockID + 2, 32)])
                }    
            }
            if (!activeBlock) {
                return
            } else if(key === 'a' || key === 'ArrowLeft') {
                moveLeft()
            } else if(key === 'd' || key === 'ArrowRight') {
                moveRight()
            } else if(key === 's' || key === 'ArrowDown') {
                moveDown()
            } else {
                console.log('stupid key')
            }
        }
        window.addEventListener('keydown', handleKeystroke)

        return () => {
            window.removeEventListener('keydown', handleKeystroke)
        }
    }, [blocks])



*/