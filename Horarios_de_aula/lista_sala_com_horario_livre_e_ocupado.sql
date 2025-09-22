SELECT 
    r.id AS room_id,
    b.name AS building_name,
    cs.day_of_week,
    cs.start_time,
    cs.end_time,
    CASE 
        WHEN cs.id IS NOT NULL THEN 'Ocupada'
        ELSE 'Livre'
    END AS status
FROM room r
JOIN building b ON r.building_id = b.id
LEFT JOIN class_schedule cs ON r.id = cs.room_id
ORDER BY r.id, cs.day_of_week, cs.start_time;