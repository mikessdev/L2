

SELECT 
    p.id AS professor_id,
    SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600) AS total_hours
FROM professor p
JOIN subject_professor sp ON sp.professor_id = p.id
JOIN subject s ON s.id = sp.subject_id
JOIN class c ON c.subject_id = s.id
JOIN class_schedule cs ON cs.class_id = c.id
GROUP BY p.id
ORDER BY total_hours DESC;



/*
       Fiquei um pouco confuso em relação ao modelo ER, não consegui 
    perceber a forma como professor se relacionava com o restante, então
    tomei a liberdade de criar uma tabela auxiliar (subject_professor) 
    ligando professor ao subject.
*/
