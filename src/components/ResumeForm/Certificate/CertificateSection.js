import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import React from "react";
import CertificateRecord from "./CertificateRecord";

const CertificateSection = ({ certificates, setCertificates, resumeId}) => {
    // 대외활동 추가 함수
    const addCertificate = () => {
        setCertificates([...certificates, { id: null, certificationName: '', issuer: '', issueDate: '' }]);
    };

    // 대외활동 제거 함수
    const removeCertificate = (index) => {
        setCertificates(certificates.filter((_, idx) => idx !== index));
    };

    // 대외활동 업데이트 함수
    const updateCertificate = (index, field, value) => {
        setCertificates(certificates.map((cert, idx) => idx === index ? { ...cert, [field]: value } : cert));
    };

    return (
        <SectionContainer title="Certificate">
            {certificates.map((cert, index) => (
                <CertificateRecord
                    key={index}
                    index={index}
                    certificate={cert}
                    onRemove={() => removeCertificate(index)}
                    onUpdate={updateCertificate}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="대외 활동 이력" onClick={addCertificate}></AddRecord>
        </SectionContainer>
    );
};

export default CertificateSection;