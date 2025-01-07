import { useState } from 'react';

//components:Board List Item  컴포넌트
export default function BoardListItem(){
    const [boardItem, setBoardItem] = useState()
    



    //components:Board List Item  컴포넌트 렌더링링
    return(
        <div className="board-list-item">
            <div className="board-list-item-box"></div>
            <div className="board-list-item-image"></div>
        </div>
    )
}