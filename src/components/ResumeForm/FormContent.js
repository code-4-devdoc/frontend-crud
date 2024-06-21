import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';
import ActivitySection from "./Activity/ActivitySection";
import EducationSection from "./Education/EducationSection";
import CertificateSection from "./Certificate/CertificateSection";
import TrainingSection from "./Training/TrainingSection";
import AboutMeSection from "./AboutMe/AboutMeSection";

// FormContent.js: 활성화된 항목들에 대응되는 컴포넌트들을 랜더링하는 역할

const FormContent = ({ activeSections,
                         activities, setActivities,
                         languages, setLanguages,
                         awards, setAwards,
                         educations, setEducations,
                         certificates, setCertificates,
                         educationCompletions, setEducationCompletions,
                         personalInfos, setPersonalInfos,
                         resumeId }) => {
    return (
        <div className="section-content">
            {activeSections.includes('AboutMe') && (
                <AboutMeSection personalInfos={personalInfos} setPersonalInfos={setPersonalInfos} resumeId={resumeId} />
            )}
            {activeSections.includes('Education') && (
                <EducationSection educations={educations} setEducations={setEducations} resumeId={resumeId} />
            )}
            {activeSections.includes('Training') && (
                <TrainingSection educationCompletions={educationCompletions} setEducationCompletions={setEducationCompletions} resumeId={resumeId} />
            )}
            {activeSections.includes('Activity') && (
                <ActivitySection activities={activities} setActivities={setActivities} resumeId={resumeId} />
            )}
            {activeSections.includes('Award') && (
                <AwardSection awards={awards} setAwards={setAwards} resumeId={resumeId} />
            )}
            {activeSections.includes('Certificate') && (
                <CertificateSection certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />
            )}
            {activeSections.includes('Language') && (
                <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />
            )}
        </div>
    );
};

export default FormContent;



