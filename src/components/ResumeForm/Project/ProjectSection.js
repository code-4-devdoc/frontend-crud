import React from 'react';
import ProjectRecord from './ProjectRecord';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";

// ProjectSection 컴포넌트: 프로젝트 섹션을 구성
const ProjectSection = ({ projects, setProjects }) => {
    // 프로젝트 추가 함수
    const addProject = () => {
        setProjects([...projects, { id: projects.length, title: '', date: '', isCurrent: false, intro: '', techStack: '', description: '' }]);
    };

    // 프로젝트 제거 함수
    const removeProject = (index) => {
        setProjects(projects.filter((_, idx) => idx !== index));
    };

    // 프로젝트 업데이트 함수
    const updateProject = (index, field, value) => {
        setProjects(projects.map((project, idx) => idx === index ? { ...project, [field]: value } : project));
    };

    return (
        <SectionContainer title="Project">
            {projects.map((project, index) => (
                <ProjectRecord
                    key={index}
                    index={index}
                    project={project}
                    onRemove={() => removeProject(index)}
                    onUpdate={updateProject}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="프로젝트" onClick={addProject}></AddRecord>
        </SectionContainer>
    );
};

export default ProjectSection;
