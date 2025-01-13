import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const Home = () => <div className='text-2xl' >Home</div>;
const Professor = () => <div>Professor</div>;
const Member = () => <div>Member</div>;
const Members = () => <div>Members</div>;
const Alumni = () => <div>Alumni</div>;
const Research = () => <div>Research</div>;
const Project = () => <div>Project</div>;
const Publication = () => <div>Publication</div>;
const CoverSelection = () => <div>Cover Selection</div>;
const RefereedJournal = () => <div>Refereed Journal</div>;
const Patent = () => <div>Patent</div>;

export default function RouterComponent(){
    return(
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/members" element={<Members />} />
        <Route path="/member/alumni" element={<Alumni />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/project" element={<Project />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/publication/cover-selection" element={<CoverSelection />} />
        <Route path="/publication/refereed-journal" element={<RefereedJournal />} />
        <Route path="/patent" element={<Patent />} />
      </Routes>
    </Router>
    )
}