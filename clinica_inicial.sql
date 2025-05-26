
-- Base de datos: clinica

-- Tabla: usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100),
    documento_identidad VARCHAR(20),
    fecha_nacimiento DATE,
    correo VARCHAR(100),
    tipo_usuario VARCHAR(20)
);

INSERT INTO usuarios (nombre_completo, documento_identidad, fecha_nacimiento, correo, tipo_usuario) VALUES
('Juan Pérez', '12345678', '1985-06-10', 'juan.perez@example.com', 'paciente'),
('Dra. Ana López', '98765432', '1975-03-25', 'ana.lopez@clinica.com', 'profesional'),
('Carlos Romero', '56781234', '1990-11-02', 'carlos.admin@clinica.com', 'administrativo');

-- Tabla: profesionales
CREATE TABLE profesionales (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    especialidad VARCHAR(100),
    licencia_medica VARCHAR(50),
    horario_atencion VARCHAR(100),
    consultorio VARCHAR(20)
);

INSERT INTO profesionales (usuario_id, especialidad, licencia_medica, horario_atencion, consultorio) VALUES
(2, 'Medicina General', 'LIC12345', 'Lunes a Viernes 8:00-14:00', 'Consultorio 3');

-- Tabla: citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES usuarios(id),
    profesional_id INT REFERENCES profesionales(id),
    fecha TIMESTAMP,
    modalidad VARCHAR(20),
    motivo TEXT,
    estado VARCHAR(20)
);

INSERT INTO citas (paciente_id, profesional_id, fecha, modalidad, motivo, estado) VALUES
(1, 1, '2025-06-01 09:00:00', 'presencial', 'Dolor de cabeza persistente', 'programada');

-- Tabla: recetas
CREATE TABLE recetas (
    id SERIAL PRIMARY KEY,
    cita_id INT REFERENCES citas(id),
    indicaciones TEXT,
    fecha TIMESTAMP DEFAULT NOW()
);

INSERT INTO recetas (cita_id, indicaciones) VALUES
(1, 'Paracetamol 500mg cada 8 horas por 5 días');

-- Tabla: atenciones
CREATE TABLE atenciones (
    id SERIAL PRIMARY KEY,
    cita_id INT REFERENCES citas(id),
    diagnostico TEXT,
    observaciones TEXT,
    examenes TEXT,
    tratamiento TEXT
);

INSERT INTO atenciones (cita_id, diagnostico, observaciones, examenes, tratamiento) VALUES
(1, 'Cefalea tensional', 'Paciente presenta signos de estrés', 'N/A', 'Reposo y medicación');

-- Tabla: sedes
CREATE TABLE sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion TEXT
);

INSERT INTO sedes (nombre, direccion) VALUES
('Clínica Central', 'Av. Salud 123, Ciudad Principal');

-- Tabla: agendas
CREATE TABLE agendas (
    id SERIAL PRIMARY KEY,
    profesional_id INT REFERENCES profesionales(id),
    sede_id INT REFERENCES sedes(id),
    dia_semana VARCHAR(10),
    hora_inicio TIME,
    hora_fin TIME
);

INSERT INTO agendas (profesional_id, sede_id, dia_semana, hora_inicio, hora_fin) VALUES
(1, 1, 'lunes', '08:00', '14:00');
