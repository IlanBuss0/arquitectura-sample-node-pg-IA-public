# 📓 Bitácora de Prompts — Ejercicio N° 2

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** Ilan Busso, Mateo Milano
- **Ejercicio:** N° _3_ — _____Refactorizaciondel CRUD repetido______________
- **Fecha:** __3/8_
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) __ChatGPT_

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
me pidieron que usando la IA extraiga las estructuras repetidas tanto de alumnos-controller como de cursos-controller mediante la utilizacion de helpers.
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
@GitHub sos un backend developer senior especializado en node y en PgSQL
a partir del proyecto https://github.com/IlanBuss0/arquitectura-sample-node-pg-IA-public.git, quiero que identifiques las estructuras repetidas en Alumnos-controller y en cursos-controller y la refactorices mediante Helpers.
la estructura a refactorizar:
try {
    const algo = await currentService.loQueSea();
    if (algo != null) {
        res.status(StatusCodes.OK).json(algo);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`No se encontro...`);
    }
} catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error: ${error.message}`);
}
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [ x] Rol
- [ x] Contexto (¿pegaste código del proyecto?)
- [ x] Tarea
- [ x] Restricciones
- [ ] Iteración

**Qué me devolvió (resumen):**
```
modifico mi proyecto y comenzo a crear varios helpers
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
tuve que corregir y tambien pregunte ya que no estoy acostumbrado a herencia, por ende habian cosas que aparecian y no sabia que eran.
```

### Prompt #2

**Lo que escribí:**
```
No debes en este trabajo modificar directamente el repositorio, dame el codigo a mi asi lo reviso y lo charlamos
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
me falto indicarle que no modifique los repositorios sino que me muestre el codigo y lo charlemos un poco si noto algo raro
```

### Prompt #3

**Lo que escribí:**
```
recorda que tambien tenes materias ademas de cursos y alumnos, fijate si ahi se actualizo para que veas como es
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
por algun motivo el repositorio no se encontraba actualizado y por ende no sabia la existencia de materias, lo actualice y ahi lo arreglo
```

### Prompt #4

**Lo que escribí:**
```
nombre repository? estoy seguro que eso no es necesario
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
no es qye haya fallado como tal, sino que era una abstraccion muy especifica, estaba armado solo para los modulos que unicamente utilicen id y nombre.
```

### Prompt #5

**Lo que escribí:**
```
perfecto, coincido con tu recomendacion, el problema es que ahora me mandaste todo menos alumnos repository.
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
me habia mandado solo el codigo de base repository pero queria ver como corregia materias-repository, cusros-repository, alumnos-repository
```

### Prompt #6

**Lo que escribí:**
```
perfecto, ahora sigamos con los services, segui la misma estructura que la anterior
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
no fallo nada, unicamente le pedi que empecemos con los repository y despues con los services ya que habia detectado que tambien se repetian modulos dentro de los services.
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|base-repository|lo creo desde cero|||
|todos los repository|modifico los modulos| | |
|base-service|lo creo desde cero| | |
|todos los services|modifico siguiendo la misma estructura en los repository| | |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
habia hecho una abstraccion muy especifica que no ameritaba en este tp, por ende considere que no tenia sentido realizarla
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
...
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
Empece contandole el problema y pidiendole distintas soluciones, luego elegi una de las opciones que me dio y le pedi que resuelva de esa manera.
Encontre cosas que no ameritaba para este tp y que eran muy especificas y por ende decidi no ponerlo en el tp. Ademas habian cosas relacionadas a como se obtiene de una clase padre un modulo, etc, que yo no sabia por ende le pregunte que eran y me lo enseño.
Aprendi como se importa una clase padre y como se importan los modulos ej "super(new cursos-repository)", que el super se usa para llamar al constructor de la clase padre.
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA
- [ ] Commit(s) en GitHub: `____________`
- [ ] Capturas / evidencias de verificación
