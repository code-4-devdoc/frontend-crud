import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styles from './ResumeList.module.css'; // CSS 모듈로 불러오기

function ResumeList({ baseUrl }) {
  const [resumes, setResumes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 4; // 페이지당 항목 수

  // Resume 목록 조회 & 새로고침
  const fetchResumes = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${baseUrl}/api/resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedResumes = data.map(resume => ({
        id: resume.id,
        title: resume.title,
        createdAt: resume.createdAt
      }));
      setResumes(formattedResumes.reverse()); // 이력서 목록을 역순으로 정렬
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Resume 생성
  const createResume = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${baseUrl}/api/resumes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTitle),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
      setNewTitle('');
    } catch (error) {
      console.error('Failed to create resume', error);
    }
  }, [baseUrl, fetchResumes, newTitle]);

  // Resume 삭제
  const deleteResume = useCallback(async (resumeId) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${baseUrl}/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
    } catch (error) {
      console.error('Failed to delete resume', error);
    }
  }, [baseUrl, fetchResumes]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentResumes = resumes.slice(offset, offset + itemsPerPage);

  return (
      <div className={styles.App}>
        <div className={styles.leftPanel}>
          <h1 className={styles.devdocTitle}>Dev<br></br>Doc</h1>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.inputContainer}>
            <h1 className={styles.title}>이력서 생성</h1>
            <div><br></br></div>
            <div className={styles.resumeInput}>
              <span className={styles.label}>제목:</span>
              <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={createResume}>등록</button>
            </div>
            <p className={styles.inputDescription}>💡 생성한 이력서는 아래 목록에 추가됩니다.</p>
          </div>

          <h2 className={styles.title}>목록</h2>
          <div className={styles.divider}></div>

          {resumes.length === 0 ? (
              <p className={styles.noResumes}>등록된 이력서가 없습니다.</p>
          ) : (
              <>
                <table className={styles.resumeTable}>
                  <tbody>
                  {currentResumes.map((resume) => (
                      <tr key={resume.id}>
                        <td className={styles.resumeInfo}>
                          <div className={styles.resumeTitle} onClick={() => navigate(`/resumes/${resume.id}`)}>
                            {resume.title}
                          </div>
                          <div
                              className={styles.resumeDate}>{resume.createdAt ? formatDateTime(resume.createdAt) : 'N/A'}</div>
                        </td>
                        <td className={styles.resumeActions}>
                          <button onClick={() => navigate(`/resumes/${resume.id}`)}>수정</button>
                          <button onClick={() => deleteResume(resume.id)}>삭제</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'이전'}
                    nextLabel={'다음'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(resumes.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    activeClassName={styles.active}
                />
              </>
          )}
        </div>
      </div>
  );
}

export default ResumeList;
