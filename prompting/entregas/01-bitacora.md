# 📓 Bitácora de Prompts — Ejercicio N° 1

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** Ilan Busso, Mateo Milano
- **Ejercicio:** N° 1 — ___________________
- **Fecha:** ___
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) ChatGPT

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
El ejercicio nos pedia que usando alguna inteligencia artificial, escribiendo un prompt completo, dando contexto, rol, restricciones y demas, le pidamos que cree el CRUD para una nueva clase "Materias"
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
    @GitHub Sos un desarrollador Backend Senior, especializado en nodeJs.
Estas trabajando en un proyecto que sigue un modelo en capas, donde cada entidad sigue un patron de triada, es decir que tienen entidad.Service, entidad.Controller, entidad.Repository.
Como base vas a encontrar las entidades Alumnos y Cursos.
Tu tarea es generar las 3 capas para una nueva entidad que la vas a llamar "Materias".
sin dependencias nuevas, mismo estilo (clases, delegar el acceso a datos en la clase `DbPg` con `this.db.queryAll/queryOne/queryReturnId/queryRowCount`, queries `$1`), mantener los `console.log`.
Este es el script que hice paa crear la tabla de materias:
-- Tabla materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(75) NOT NULL
);

-- Tabla calificaciones
-- Cada alumno tiene UNA sola calificación por materia (no se repite la combinación alumno+materia).
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL REFERENCES alumnos(id),
    id_materia INT NOT NULL REFERENCES materias(id),
    nota INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(id_alumno, id_materia)
);

-- Datos de prueba para materias
INSERT INTO materias (nombre) VALUES ('Matemática');
INSERT INTO materias (nombre) VALUES ('Lengua');
INSERT INTO materias (nombre) VALUES ('Historia');
INSERT INTO materias (nombre) VALUES ('Programación');
INSERT INTO materias (nombre) VALUES ('Base de Datos');

Vamos a ir capa por capa empezando por Materias.Repository
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [ x] Rol
- [ x] Contexto (¿pegaste código del proyecto?)
- [ x] Tarea
- [ x] Restricciones
- [ x] Iteración

**Qué me devolvió (resumen):**
```
Se baso en cursos debido a que, a partir de los atributos que le mande que tenia la tabla en la bd, se dio cuenta que tiene los mismos atributos que cursos, por ende al crear repository copio y pego de cursos-reposirory y modifico los nombres, en vez de 'cursos' escribia 'materias'
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
al pasar con materias controller la IA commiteo directo al repositorio sin decirme que hizo, le tuve que pedir que no commitee sino que me esrciba el codigo en el mismo chat
```

### Prompt #2

**Lo que escribí:**
```
No quiero que crees materias-controller, quiero que hagamos el codigo aca, no commitees directo, vamos con materias-controller
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
lo explique mas arriba, no me mostro que hizo, directamente hizo un commit en el repositorio
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|materias-controller|Todo IA| |
|materias-service|Todo IA| | |
|materias-repository|Todo IA| | |

no tuve que modificar mucho,
---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
Errores como tal no encontramos, unicamente el tema de los commits.
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
Postman:
- todos los get, delete, update funcionan.

- Salida en Localhost funciona.

...
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
...
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA
- [ ] Commit(s) en GitHub: `____________`
- [ ] Capturas / evidencias de verificación
