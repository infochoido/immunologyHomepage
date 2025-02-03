import { Routes, Route } from 'react-router-dom';
import BoardEdit from '../pages/BoardEdit';

export default function Router() {
    return (
        <Routes>
            {/* ... existing routes ... */}
            <Route path="/board/edit/:boardNumber" element={<BoardEdit />} />
        </Routes>
    );
} 