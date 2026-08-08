"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  comparisonRows,
  ecologicalLevels,
  finalQuiz,
  glossary,
  interventionPhases,
  introduction,
  modelComparison,
  modules,
  navigation,
  type LearningModule,
  type QuizQuestion,
  units,
} from "./course-data";

type ProgressState = {
  visited: string[];
  completed: string[];
  answers: Record<string, number>;
  reflections: Record<string, string>;
  last: string;
};

type PresentationSlide = {
  kicker: string;
  title: string;
  body?: string;
  points?: string[];
};

const STORAGE_KEY = "mipsi-course-progress-v1";
const emptyProgress: ProgressState = {
  visited: [],
  completed: [],
  answers: {},
  reflections: {},
  last: "introduccion",
};

function safeExternalProps() {
  return { target: "_blank", rel: "noopener noreferrer" } as const;
}

function useCourseProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setProgress({ ...emptyProgress, ...JSON.parse(stored) });
      } catch {
        setProgress(emptyProgress);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  const visit = useCallback((id: string) => {
    setProgress((current) => ({
      ...current,
      last: id,
      visited: current.visited.includes(id) ? current.visited : [...current.visited, id],
    }));
  }, []);

  const answer = useCallback((id: string, option: number) => {
    setProgress((current) => ({ ...current, answers: { ...current.answers, [id]: option } }));
  }, []);

  const reflect = useCallback((id: string, value: string) => {
    setProgress((current) => ({ ...current, reflections: { ...current.reflections, [id]: value } }));
  }, []);

  const complete = useCallback((id: string) => {
    setProgress((current) => current.completed.includes(id)
      ? current
      : { ...current, completed: [...current.completed, id] });
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setProgress(emptyProgress);
  }, []);

  return { progress, visit, answer, reflect, complete, reset, hydrated };
}

function Quiz({
  questions,
  answers,
  onAnswer,
  onComplete,
  title = "Autoevaluación",
}: {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  onAnswer: (id: string, option: number) => void;
  onComplete?: () => void;
  title?: string;
}) {
  const answered = questions.filter((question) => answers[question.id] !== undefined).length;
  const score = questions.filter((question) => answers[question.id] === question.answer).length;

  useEffect(() => {
    if (answered === questions.length && onComplete) onComplete();
  }, [answered, questions.length, onComplete]);

  return (
    <section className="learning-block quiz-block" aria-labelledby={`${questions[0]?.id}-title`}>
      <div className="block-heading">
        <span>11</span>
        <div>
          <p className="eyebrow">Comprueba tu comprensión</p>
          <h2 id={`${questions[0]?.id}-title`}>{title}</h2>
        </div>
        <p className="quiz-count" aria-live="polite">{answered}/{questions.length}</p>
      </div>
      <div className="quiz-list">
        {questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          const hasAnswered = selected !== undefined;
          const correct = selected === question.answer;
          return (
            <fieldset className="question-card" key={question.id}>
              <legend><span>{questionIndex + 1}</span>{question.prompt}</legend>
              <div className="option-list">
                {question.options.map((option, optionIndex) => (
                  <label className={`quiz-option ${selected === optionIndex ? "selected" : ""}`} key={option}>
                    <input
                      type="radio"
                      name={question.id}
                      checked={selected === optionIndex}
                      onChange={() => onAnswer(question.id, optionIndex)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {hasAnswered && (
                <div className={`feedback ${correct ? "correct" : "incorrect"}`} role="status">
                  <strong>{correct ? "Respuesta correcta." : "Revisa la relación conceptual."}</strong> {question.explanation}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      {answered === questions.length && (
        <div className="score-panel" aria-live="polite">
          <strong>{score} de {questions.length}</strong>
          <span>{score >= Math.ceil(questions.length * 0.8) ? "Dominio logrado. Puedes avanzar." : "Vuelve al resumen y ajusta las respuestas que lo necesiten."}</span>
        </div>
      )}
    </section>
  );
}

function ReflectionBox({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="reflection-box" htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} value={value} placeholder={placeholder} onChange={(event) => onChange(id, event.target.value)} />
      <small>Se guarda únicamente en este dispositivo.</small>
    </label>
  );
}

function CourseHeader({
  progressPercent,
  mode,
  onToggleMode,
  onOpenMenu,
}: {
  progressPercent: number;
  mode: "estudio" | "presentacion";
  onToggleMode: () => void;
  onOpenMenu: () => void;
}) {
  return (
    <header className="topbar">
      <button className="menu-button" type="button" onClick={onOpenMenu} aria-label="Abrir menú del curso">Menú</button>
      <div className="topbar-title">
        <span>Maestría en Intervención Psicosocial</span>
        <strong>Modelos y técnicas de intervención psicosocial I</strong>
      </div>
      <div className="topbar-actions">
        <div className="mini-progress" aria-label={`Progreso del curso ${progressPercent}%`}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <button className="mode-button" type="button" onClick={onToggleMode}>
          {mode === "estudio" ? "Presentar" : "Salir de presentación"}
        </button>
      </div>
    </header>
  );
}

function Sidebar({
  activeId,
  completed,
  open,
  onNavigate,
  onClose,
}: {
  activeId: string;
  completed: string[];
  open: boolean;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <button className={`nav-scrim ${open ? "show" : ""}`} type="button" onClick={onClose} aria-label="Cerrar menú" />
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Navegación del curso">
        <div className="brand-lockup">
          {/* The source deck supplies this institutional mark. */}
          <Image src="/cuc-logo.png" alt="Universidad de la Costa CUC" width={178} height={62} priority />
          <p>OVA universitario</p>
        </div>
        <nav>
          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`${activeId === item.id ? "active" : ""} ${completed.includes(item.id) ? "complete" : ""}`}
              aria-current={activeId === item.id ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-marker" aria-hidden="true">{completed.includes(item.id) ? "✓" : item.unit || "•"}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <strong>Dos formas de recorrer</strong>
          <span>Estudia a tu ritmo o proyecta cada bloque en clase.</span>
        </div>
      </aside>
    </>
  );
}

function HomePage({ onNavigate, completed, last }: { onNavigate: (id: string) => void; completed: string[]; last: string }) {
  const percent = Math.round((completed.filter((id) => modules.some((module) => module.id === id)).length / modules.length) * 100);
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Maestría en Intervención Psicosocial</p>
          <h1>Modelos y técnicas de intervención psicosocial I</h1>
          <p className="hero-lede">Una ruta para comprender contextos, trabajar con comunidades y convertir modelos rigurosos en decisiones de intervención éticas y aplicables.</p>
          <blockquote>{introduction.question}</blockquote>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onNavigate("introduccion")}>Comenzar recorrido</button>
            <button className="secondary-button" type="button" onClick={() => onNavigate(last || "introduccion")}>Continuar donde quedé</button>
          </div>
        </div>
        <div className="hero-orbit" aria-label="Cinco modelos conectados en tres unidades">
          <div className="orbit-core">
            <strong>{percent}%</strong>
            <span>progreso</span>
          </div>
          {modules.map((module, index) => (
            <button key={module.id} style={{ "--orbit-index": index } as React.CSSProperties} onClick={() => onNavigate(module.id)} type="button">
              <span>{module.number}</span>{module.shortTitle}
            </button>
          ))}
        </div>
      </section>

      <section className="course-promise" aria-labelledby="promise-title">
        <p className="eyebrow">Competencia específica</p>
        <h2 id="promise-title">De la lectura crítica a la acción situada</h2>
        <p>{introduction.competence}</p>
        <div className="promise-steps">
          {[
            ["01", "Comprender", "Distingue supuestos, niveles y relaciones."],
            ["02", "Analizar", "Lee poder, contexto, recursos y participación."],
            ["03", "Aplicar", "Selecciona técnicas coherentes con el modelo."],
            ["04", "Integrar", "Construye una intervención multirreferencial."],
          ].map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="units-section" aria-labelledby="units-title">
        <div className="section-intro">
          <p className="eyebrow">Itinerario de aprendizaje</p>
          <h2 id="units-title">Tres unidades, cinco lentes complementarios</h2>
          <p>Cada unidad avanza desde comprensión conceptual hasta aplicación, retroalimentación y decisión profesional.</p>
        </div>
        <div className="unit-list">
          {units.map((unit) => (
            <article key={unit.number}>
              <div className="unit-number">0{unit.number}</div>
              <div><h3>{unit.title}</h3><p>{unit.description}</p></div>
              <ul>{unit.modules.map((module) => <li key={module}>{module}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function IntroductionPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <article className="content-page intro-page">
      <header className="page-hero compact">
        <p className="eyebrow">Introducción</p>
        <h1>Comprender los modelos de intervención</h1>
        <p>Un modelo no es una receta. Es una forma argumentada de leer la realidad, decidir con quién actuar y justificar por qué una técnica puede contribuir al cambio.</p>
      </header>

      <section className="learning-block">
        <div className="block-heading"><span>1</span><div><p className="eyebrow">Tres niveles de decisión</p><h2>Modelo, estrategia y técnica no son sinónimos</h2></div></div>
        <div className="distinction-grid">
          {introduction.distinctions.map((item) => (
            <article key={item.term}><h3>{item.term}</h3><p>{item.definition}</p><strong>{item.question}</strong></article>
          ))}
        </div>
      </section>

      <section className="learning-block intervention-contrast">
        <div className="block-heading"><span>2</span><div><p className="eyebrow">Una distinción decisiva</p><h2>Intervenir no equivale a capacitar</h2></div></div>
        <div className="contrast-pair">
          {introduction.interventionVsTraining.map((item, index) => (
            <article key={item.title} className={index === 0 ? "emphasis" : ""}><span>{index === 0 ? "Proceso" : "Componente posible"}</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </section>

      <section className="learning-block facilitator-block">
        <div className="facilitator-mark">↔</div>
        <div><p className="eyebrow">Rol profesional</p><h2>Facilitar es ampliar capacidad de análisis y decisión</h2><p>{introduction.facilitator}</p></div>
      </section>

      <section className="learning-block relation-chain">
        <div className="block-heading"><span>3</span><div><p className="eyebrow">La lógica del curso</p><h2>Participación, contexto y transformación se necesitan mutuamente</h2></div></div>
        <div className="chain">
          <div><strong>Contexto</strong><span>Comprender relaciones e historia</span></div>
          <i>→</i><div><strong>Participación</strong><span>Producir saber y decisión compartida</span></div>
          <i>→</i><div><strong>Intervención</strong><span>Actuar con una teoría de cambio</span></div>
          <i>→</i><div><strong>Transformación</strong><span>Modificar capacidades y condiciones</span></div>
        </div>
      </section>

      <div className="next-callout">
        <div><p className="eyebrow">Resultado integrado</p><p>{introduction.outcome}</p></div>
        <button className="primary-button" type="button" onClick={() => onNavigate("ibc")}>Entrar a la Unidad 1</button>
      </div>
    </article>
  );
}

function ParadigmComparator() {
  const [focus, setFocus] = useState<"tradicional" | "participativo">("participativo");
  return (
    <section className="interactive-panel" aria-labelledby="comparator-title">
      <div className="interactive-heading"><span>Interactúa</span><h3 id="comparator-title">Comparador de paradigmas</h3><p>Alterna la perspectiva y observa cómo cambia el lugar de la comunidad.</p></div>
      <div className="segmented-control" role="group" aria-label="Perspectiva del comparador">
        <button type="button" className={focus === "tradicional" ? "selected" : ""} onClick={() => setFocus("tradicional")}>Tradicional</button>
        <button type="button" className={focus === "participativo" ? "selected" : ""} onClick={() => setFocus("participativo")}>IBC participativa</button>
      </div>
      <table className="comparison-table">
        <caption className="sr-only">Comparación entre paradigma tradicional e Intervención Basada en la Comunidad</caption>
        <thead><tr><th>Dimensión</th><th>Paradigma tradicional</th><th>IBC participativa</th></tr></thead>
        <tbody>{comparisonRows.map(([dimension, traditional, participatory]) => (
          <tr key={dimension}>
            <th scope="row">{dimension}</th>
            <td className={focus === "tradicional" ? "highlight" : "muted"}>{traditional}</td>
            <td className={focus === "participativo" ? "highlight" : "muted"}>{participatory}</td>
          </tr>
        ))}</tbody>
      </table>
    </section>
  );
}

function PhaseStepper() {
  const [step, setStep] = useState(0);
  return (
    <section className="interactive-panel" aria-labelledby="stepper-title">
      <div className="interactive-heading"><span>Explora</span><h3 id="stepper-title">Fases del proceso de intervención</h3><p>El recorrido es cíclico: evaluar puede abrir un nuevo diagnóstico.</p></div>
      <div className="stepper-tabs" role="tablist" aria-label="Fases de intervención">
        {interventionPhases.map((phase, index) => (
          <button key={phase.title} type="button" role="tab" aria-selected={step === index} className={step === index ? "active" : ""} onClick={() => setStep(index)}><span>{index + 1}</span>{phase.title}</button>
        ))}
      </div>
      <div className="stepper-detail" role="tabpanel"><span>0{step + 1}</span><div><h4>{interventionPhases[step].title}</h4><p>{interventionPhases[step].text}</p></div></div>
    </section>
  );
}

function CartographyGuide() {
  const steps = [
    ["Delimitar", "Define territorio, propósito y población sin suponer que todos lo viven igual."],
    ["Convocar", "Incluye generaciones, géneros, liderazgos, voces periféricas e instituciones relevantes."],
    ["Representar", "Ubica lugares, recorridos, fronteras, recursos, riesgos, afectos y conflictos."],
    ["Interpretar", "Pregunta por patrones, ausencias, desigualdades y cambios históricos."],
    ["Devolver", "Valida hallazgos, acuerda prioridades y conserva una copia accesible para la comunidad."],
  ];
  const [current, setCurrent] = useState(0);
  return (
    <section className="interactive-panel cartography-guide" aria-labelledby="cartography-title">
      <div className="interactive-heading"><span>Guía</span><h3 id="cartography-title">Construye una cartografía social</h3><p>Avanza por una secuencia que protege diversidad y devolución.</p></div>
      <div className="guide-layout">
        <ol>{steps.map(([title], index) => <li key={title}><button type="button" className={current === index ? "active" : ""} onClick={() => setCurrent(index)}><span>{index + 1}</span>{title}</button></li>)}</ol>
        <div className="territory-canvas" aria-live="polite"><div className="map-mark one" /><div className="map-mark two" /><div className="map-mark three" /><div className="map-route" /><strong>{steps[current][0]}</strong><p>{steps[current][1]}</p></div>
      </div>
    </section>
  );
}

function ProblemTree({ progress, onReflect }: { progress: ProgressState; onReflect: (id: string, value: string) => void }) {
  return (
    <section className="interactive-panel" aria-labelledby="tree-title">
      <div className="interactive-heading"><span>Construye</span><h3 id="tree-title">Árbol de problemas</h3><p>Formula elementos específicos y comprueba la lógica causa–efecto.</p></div>
      <div className="problem-tree">
        <ReflectionBox id="tree-effects" label="Ramas · consecuencias" value={progress.reflections["tree-effects"] || ""} onChange={onReflect} placeholder="¿Qué efectos verificables produce?" />
        <div className="tree-trunk"><ReflectionBox id="tree-problem" label="Tronco · problema central" value={progress.reflections["tree-problem"] || ""} onChange={onReflect} placeholder="Situación negativa, específica y sin solución implícita" /></div>
        <ReflectionBox id="tree-causes" label="Raíces · causas" value={progress.reflections["tree-causes"] || ""} onChange={onReflect} placeholder="¿Qué condiciones directas e indirectas la producen?" />
      </div>
    </section>
  );
}

function LeadershipMatrix() {
  const [selected, setSelected] = useState("aliado");
  const quadrants = [
    { id: "aliado", title: "Alta influencia · aliado", text: "Integrar al grupo motor con reglas de rendición de cuentas." },
    { id: "resistente", title: "Alta influencia · resistente", text: "Dialogar, comprender intereses y negociar sin entregar el control." },
    { id: "emergente", title: "Baja influencia · aliado", text: "Fortalecer voz, habilidades, conexiones y oportunidades de liderazgo." },
    { id: "periferico", title: "Baja influencia · distante", text: "Explorar barreras de participación y relevancia del proyecto." },
  ];
  return (
    <section className="interactive-panel" aria-labelledby="matrix-title">
      <div className="interactive-heading"><span>Decide</span><h3 id="matrix-title">Matriz de liderazgos</h3><p>Selecciona un cuadrante para diseñar una relación diferenciada.</p></div>
      <div className="matrix-axis"><span className="y-axis">Influencia ↑</span><div className="leadership-grid">{quadrants.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={selected === item.id ? "active" : ""}><strong>{item.title}</strong><span>{item.text}</span></button>)}</div><span className="x-axis">Disposición frente al proyecto →</span></div>
    </section>
  );
}

function EcologicalExplorer() {
  const [selected, setSelected] = useState("micro");
  const level = ecologicalLevels.find((item) => item.id === selected) || ecologicalLevels[0];
  const factors = [
    { id: "eco-factor-1", text: "Coordinación familia–escuela", answer: "meso" },
    { id: "eco-factor-2", text: "Horario del transporte municipal", answer: "exo" },
    { id: "eco-factor-3", text: "Estigma hacia jóvenes que trabajan", answer: "macro" },
  ];
  const [choices, setChoices] = useState<Record<string, string>>({});
  return (
    <section className="interactive-panel" aria-labelledby="ecology-title">
      <div className="interactive-heading"><span>Explora</span><h3 id="ecology-title">Niveles ecológicos</h3><p>Selecciona un anillo y luego clasifica tres factores del caso.</p></div>
      <div className="ecology-explorer">
        <div className="eco-rings" aria-label="Selector de niveles ecológicos">
          {[...ecologicalLevels].reverse().map((item, index) => <button key={item.id} type="button" className={`${item.id} ${selected === item.id ? "active" : ""}`} onClick={() => setSelected(item.id)} style={{ inset: `${index * 28}px` }}><span>{item.title}</span></button>)}
          <div className="eco-person">Persona</div>
        </div>
        <div className="eco-detail"><p className="eyebrow">{level.title}</p><h4>{level.example}</h4><p>{level.action}</p></div>
      </div>
      <div className="classification-activity">
        <h4>Clasifica factores</h4>
        {factors.map((factor) => (
          <div key={factor.id}><span>{factor.text}</span><select aria-label={`Nivel para ${factor.text}`} value={choices[factor.id] || ""} onChange={(event) => setChoices((current) => ({ ...current, [factor.id]: event.target.value }))}><option value="">Selecciona nivel</option>{ecologicalLevels.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>{choices[factor.id] && <strong className={choices[factor.id] === factor.answer ? "right" : "wrong"}>{choices[factor.id] === factor.answer ? "Correcto" : "Revisa dónde opera"}</strong>}</div>
        ))}
      </div>
    </section>
  );
}

function NetworkExplorer() {
  const nodes = [
    { id: "lideresa", label: "Lideresa", type: "Nodo central", note: "Conecta familias e instituciones, pero está sobrecargada." },
    { id: "escuela", label: "Escuela", type: "Puente potencial", note: "Puede conectar redes institucionales y vínculos cotidianos." },
    { id: "salud", label: "Centro de salud", type: "Nodo formal", note: "Tiene recursos, aunque horarios y lenguaje limitan el acceso." },
    { id: "jovenes", label: "Colectivo juvenil", type: "Nodo periférico", note: "Aporta información y creatividad, pero participa poco en decisiones." },
    { id: "comercio", label: "Comercios", type: "Alianza posible", note: "Pueden movilizar recursos y difusión con acuerdos transparentes." },
  ];
  const [selected, setSelected] = useState(nodes[0].id);
  const node = nodes.find((item) => item.id === selected) || nodes[0];
  return (
    <section className="interactive-panel" aria-labelledby="network-title">
      <div className="interactive-heading"><span>Visualiza</span><h3 id="network-title">Mapa de redes y capital social</h3><p>Explora posiciones distintas. Las líneas representan flujos que deben verificarse.</p></div>
      <div className="network-layout">
        <div className="network-canvas">
          <div className="network-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          {nodes.map((item, index) => <button type="button" key={item.id} className={`${item.id} ${selected === item.id ? "active" : ""}`} style={{ "--node-index": index } as React.CSSProperties} onClick={() => setSelected(item.id)}>{item.label}</button>)}
        </div>
        <div className="network-detail" aria-live="polite"><p className="eyebrow">{node.type}</p><h4>{node.label}</h4><p>{node.note}</p><strong>Pregunta clave</strong><span>¿Qué circula por sus vínculos y quién queda por fuera?</span></div>
      </div>
    </section>
  );
}

function PopularEducationReflection({ progress, onReflect }: { progress: ProgressState; onReflect: (id: string, value: string) => void }) {
  return (
    <section className="interactive-panel" aria-labelledby="popular-title">
      <div className="interactive-heading"><span>Reflexiona</span><h3 id="popular-title">De la lectura del contexto a la acción</h3><p>La reflexión se guarda localmente para que puedas retomarla.</p></div>
      <div className="reflection-grid">
        <ReflectionBox id="ep-reading" label="¿Qué está pasando y por qué se ha naturalizado?" value={progress.reflections["ep-reading"] || ""} onChange={onReflect} placeholder="Describe la situación, voces y tensiones…" />
        <ReflectionBox id="ep-action" label="¿Qué podemos hacer colectivamente?" value={progress.reflections["ep-action"] || ""} onChange={onReflect} placeholder="Formula una acción, responsables y aprendizaje esperado…" />
      </div>
    </section>
  );
}

function ModuleInteraction({ module, progress, onReflect }: { module: LearningModule; progress: ProgressState; onReflect: (id: string, value: string) => void }) {
  if (module.id === "ibc") return <><ParadigmComparator /><PhaseStepper /><CartographyGuide /><ProblemTree progress={progress} onReflect={onReflect} /></>;
  if (module.id === "empoderamiento") return <LeadershipMatrix />;
  if (module.id === "ecologico") return <EcologicalExplorer />;
  if (module.id === "redes") return <NetworkExplorer />;
  return <PopularEducationReflection progress={progress} onReflect={onReflect} />;
}

function ResourceBlock({ module }: { module: LearningModule }) {
  const resource = module.resource;
  return (
    <section className="learning-block resource-block">
      <div className="block-heading"><span>8</span><div><p className="eyebrow">Video o recurso complementario</p><h2>{resource.title}</h2></div></div>
      <p className="orienting-question">Pregunta orientadora · {resource.prompt}</p>
      {resource.kind === "video" && resource.embedUrl ? (
        <div className="video-shell">
          <iframe src={resource.embedUrl} title={resource.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      ) : (
        <div className="reading-shell"><span>Lectura académica</span><p>Abre el recurso en una pestaña nueva y regresa para aplicar la pregunta orientadora.</p></div>
      )}
      <a className="external-button" href={resource.url} {...safeExternalProps()}>{resource.label} ↗</a>
    </section>
  );
}

function ModulePage({
  module,
  progress,
  onAnswer,
  onReflect,
  onComplete,
  onNavigate,
}: {
  module: LearningModule;
  progress: ProgressState;
  onAnswer: (id: string, option: number) => void;
  onReflect: (id: string, value: string) => void;
  onComplete: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const nextItem = navigation[navigation.findIndex((item) => item.id === module.id) + 1];
  return (
    <article className={`content-page module-page accent-${module.accent}`}>
      <header className="page-hero module-hero">
        <div><p className="eyebrow">Unidad {module.unit} · Módulo {module.number}</p><h1>{module.title}</h1><p>{module.unitTitle}</p></div>
        <div className="outcome-card"><span>Resultado de aprendizaje</span><p>{module.outcome}</p></div>
      </header>

      <section className="learning-block prior-block">
        <div className="block-heading"><span>2</span><div><p className="eyebrow">Activa conocimientos previos</p><h2>Antes de entrar al modelo</h2></div></div>
        <p>{module.priorPrompt}</p>
      </section>

      <section className="learning-block">
        <div className="block-heading"><span>3</span><div><p className="eyebrow">Explicación conceptual</p><h2>Conceptos para orientar la mirada</h2></div></div>
        <div className="concept-grid">{module.concepts.map((concept) => <article key={concept.title}><h3>{concept.title}</h3><p>{concept.body}</p></article>)}</div>
      </section>

      <section className="learning-block authors-block">
        <div className="block-heading"><span>4</span><div><p className="eyebrow">Fundamentos y autores</p><h2>Una tradición, varias contribuciones</h2></div></div>
        <div className="author-list">{module.authors.map((author, index) => <article key={author.name}><span>0{index + 1}</span><div><h3>{author.name}</h3><p>{author.contribution}</p></div></article>)}</div>
      </section>

      <section className="learning-block principles-block">
        <div className="block-heading"><span>5</span><div><p className="eyebrow">Características y principios</p><h2>Criterios que deben verse en la práctica</h2></div></div>
        <div className="principle-list">{module.principles.map((principle) => <article key={principle.title}><h3>{principle.title}</h3><p>{principle.body}</p></article>)}</div>
      </section>

      <section className="learning-block techniques-block">
        <div className="block-heading"><span>6</span><div><p className="eyebrow">Técnicas de intervención</p><h2>Procedimientos con propósito</h2></div></div>
        <div className="technique-accordion">{module.techniques.map((technique, index) => <details key={technique.title} open={index === 0}><summary><span>0{index + 1}</span><div><strong>{technique.title}</strong><small>{technique.purpose}</small></div></summary><ol>{technique.steps.map((step) => <li key={step}>{step}</li>)}</ol></details>)}</div>
      </section>

      <section className="learning-block case-block">
        <div className="block-heading"><span>7</span><div><p className="eyebrow">Ejemplo aplicado</p><h2>{module.caseStudy.title}</h2></div></div>
        <p className="case-context">{module.caseStudy.context}</p>
        <div className="case-analysis">{module.caseStudy.analysis.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p></div>)}</div>
        <div className="case-decision"><strong>Decisión de intervención</strong><p>{module.caseStudy.decision}</p></div>
      </section>

      <ResourceBlock module={module} />

      <section className="learning-block activity-block">
        <div className="block-heading"><span>9</span><div><p className="eyebrow">Actividad práctica</p><h2>{module.activity.title}</h2></div></div>
        <p>{module.activity.instruction}</p>
        <ol>{module.activity.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol>
        {module.id === "empoderamiento" && (
          <div className="external-activity">
            <div><span>Actividad externa</span><strong>Padlet · ¿Con qué asocias el empoderamiento?</strong><p>Padlet puede bloquear su inserción según la sesión o sus políticas. El acceso directo siempre queda disponible.</p></div>
            <a href="https://padlet.com/libanez7/con-que-asocias-el-empoderamiento-2do7q6765930oqdb" {...safeExternalProps()}>Abrir Padlet ↗</a>
          </div>
        )}
        <ModuleInteraction module={module} progress={progress} onReflect={onReflect} />
      </section>

      <section className="learning-block summary-block">
        <div className="block-heading"><span>10</span><div><p className="eyebrow">Resumen visual</p><h2>Lo esencial del modelo</h2></div></div>
        <div className="summary-flow">{module.summary.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p></div>)}</div>
      </section>

      <Quiz questions={module.quiz} answers={progress.answers} onAnswer={onAnswer} onComplete={() => onComplete(module.id)} />

      <section className="learning-block references-block">
        <div className="block-heading"><span>12</span><div><p className="eyebrow">Referencias del módulo</p><h2>Fuentes para profundizar</h2></div></div>
        <ol>{module.references.map((reference) => <li key={reference}>{reference}</li>)}</ol>
      </section>

      <div className="module-next">
        <div><span>{progress.completed.includes(module.id) ? "Módulo completado" : "Completa la autoevaluación para registrar el avance"}</span><strong>{nextItem?.id === "cierre" ? "Integra los cinco modelos" : "Continúa el itinerario"}</strong></div>
        {nextItem && <button className="primary-button" type="button" onClick={() => onNavigate(nextItem.id)}>Siguiente · {nextItem.label}</button>}
      </div>
    </article>
  );
}

function ClosingPage({
  progress,
  onAnswer,
  onReset,
}: {
  progress: ProgressState;
  onAnswer: (id: string, option: number) => void;
  onReset: () => void;
}) {
  const referencesByUnit = units.map((unit) => ({
    unit,
    references: modules.filter((module) => module.unit === unit.number).flatMap((module) => module.references),
  }));
  return (
    <article className="content-page closing-page">
      <header className="page-hero compact"><p className="eyebrow">Cierre del curso</p><h1>Integrar modelos sin perder coherencia</h1><p>Los modelos no compiten por explicar todo. Se articulan cuando cada uno cumple una función clara dentro de una teoría de cambio compartida.</p></header>

      <section className="learning-block">
        <div className="block-heading"><span>1</span><div><p className="eyebrow">Comparación general</p><h2>Cinco preguntas para seleccionar y combinar</h2></div></div>
        <div className="model-comparison">{modelComparison.map((item) => <article key={item.model}><span>{item.model}</span><h3>{item.question}</h3><p>{item.bestFor}</p><small>Riesgo: {item.caution}</small></article>)}</div>
      </section>

      <section className="learning-block integration-block">
        <div className="block-heading"><span>2</span><div><p className="eyebrow">Integración multimodelo</p><h2>Una misma intervención puede usar varios lentes</h2></div></div>
        <div className="integration-diagram">
          <div><strong>IBC</strong><span>construye el diagnóstico con la comunidad</span></div><i>+</i>
          <div><strong>Ecológico</strong><span>organiza influencias y acciones multinivel</span></div><i>+</i>
          <div><strong>Redes</strong><span>moviliza vínculos, recursos y alianzas</span></div><i>+</i>
          <div><strong>Empoderamiento</strong><span>redistribuye capacidad de decisión</span></div><i>+</i>
          <div><strong>Educación Popular</strong><span>convierte reflexión en praxis</span></div>
        </div>
      </section>

      <section className="learning-block ethics-block">
        <div className="block-heading"><span>3</span><div><p className="eyebrow">Principios éticos transversales</p><h2>La forma de intervenir también produce efectos</h2></div></div>
        <div className="ethics-list">
          {["Dignidad y no estigmatización", "Participación informada y derecho a disentir", "Justicia y atención a desigualdades", "Cuidado, confidencialidad y no daño", "Transparencia sobre recursos y decisiones", "Reflexividad sobre el poder profesional", "Devolución de resultados", "Sostenibilidad sin dependencia"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>)}
        </div>
      </section>

      <Quiz questions={finalQuiz} answers={progress.answers} onAnswer={onAnswer} title="Evaluación final integradora" />

      <section className="learning-block glossary-block">
        <div className="block-heading"><span>5</span><div><p className="eyebrow">Glosario</p><h2>Conceptos para volver a consultar</h2></div></div>
        <dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
      </section>

      <section className="learning-block references-block all-references">
        <div className="block-heading"><span>6</span><div><p className="eyebrow">Referencias bibliográficas</p><h2>Organizadas por unidad</h2></div></div>
        {referencesByUnit.map(({ unit, references }) => <details key={unit.number}><summary>Unidad {unit.number} · {unit.title}</summary><ol>{references.map((reference, index) => <li key={`${reference}-${index}`}>{reference}</li>)}</ol></details>)}
        <details><summary>Recurso externo opcional</summary><p>Quizizz puede utilizarse con un código temporal definido por el docente. Las evaluaciones internas de esta aplicación no dependen de ese servicio.</p><a className="external-button" href="https://quizizz.com/join" {...safeExternalProps()}>Abrir Quizizz ↗</a></details>
      </section>

      <div className="reset-panel"><div><p className="eyebrow">Control local</p><h2>Reiniciar el progreso</h2><p>Elimina respuestas, notas y módulos completados guardados en este navegador. Esta acción no puede deshacerse.</p></div><button className="danger-button" type="button" onClick={() => { if (window.confirm("¿Deseas borrar todo el progreso guardado en este dispositivo?")) onReset(); }}>Borrar progreso</button></div>
    </article>
  );
}

function makePresentationSlides(activeId: string): PresentationSlide[] {
  const activeModuleData = modules.find((item) => item.id === activeId);
  if (activeModuleData) {
    return [
      { kicker: `Unidad ${activeModuleData.unit} · Módulo ${activeModuleData.number}`, title: activeModuleData.title, body: activeModuleData.outcome },
      ...activeModuleData.concepts.map((item) => ({ kicker: "Concepto fundamental", title: item.title, body: item.body })),
      { kicker: "Fundamentos", title: "Autores y contribuciones", points: activeModuleData.authors.map((item) => `${item.name}: ${item.contribution}`) },
      { kicker: "Principios", title: "Criterios para reconocer el modelo", points: activeModuleData.principles.map((item) => `${item.title}: ${item.body}`) },
      ...activeModuleData.techniques.map((item) => ({ kicker: "Técnica de intervención", title: item.title, body: item.purpose, points: item.steps })),
      { kicker: "Caso aplicado", title: activeModuleData.caseStudy.title, body: activeModuleData.caseStudy.context, points: activeModuleData.caseStudy.analysis },
      { kicker: "Síntesis", title: "Lo esencial", points: activeModuleData.summary },
    ];
  }
  if (activeId === "cierre") return [
    { kicker: "Cierre", title: "Cinco modelos, una intervención coherente", body: "Cada modelo responde una pregunta distinta y puede integrarse dentro de una teoría de cambio situada." },
    ...modelComparison.map((item) => ({ kicker: item.model, title: item.question, body: item.bestFor, points: [`Cuidado: ${item.caution}`] })),
    { kicker: "Ética", title: "La forma de intervenir también transforma", points: ["Participación informada", "Justicia y no estigmatización", "Transparencia y devolución", "Reflexividad sobre el poder", "Sostenibilidad sin dependencia"] },
  ];
  if (activeId === "introduccion") return [
    { kicker: "Pregunta guía", title: "Comprender antes de actuar", body: introduction.question },
    ...introduction.distinctions.map((item) => ({ kicker: item.term, title: item.question, body: item.definition })),
    { kicker: "Distinción", title: "Intervención no es capacitación", points: introduction.interventionVsTraining.map((item) => `${item.title}: ${item.text}`) },
    { kicker: "Rol profesional", title: "Facilitar capacidad de análisis y decisión", body: introduction.facilitator },
  ];
  return [
    { kicker: "Maestría en Intervención Psicosocial", title: "Modelos y técnicas de intervención psicosocial I", body: introduction.question },
    ...units.map((unit) => ({ kicker: `Unidad ${unit.number}`, title: unit.title, body: unit.description, points: unit.modules })),
  ];
}

function PresentationMode({ slides, index, onIndex, onExit }: { slides: PresentationSlide[]; index: number; onIndex: (index: number) => void; onExit: () => void }) {
  const slide = slides[index];
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") onIndex(Math.min(slides.length - 1, index + 1));
      if (event.key === "ArrowLeft") onIndex(Math.max(0, index - 1));
      if (event.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, onExit, onIndex, slides.length]);

  return (
    <div className="presentation-overlay" role="dialog" aria-modal="true" aria-label="Modo presentación">
      <header><span>{index + 1} / {slides.length}</span><div className="presentation-progress"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div><button type="button" onClick={onExit}>Salir</button></header>
      <main>
        <div className="presentation-slide">
          <p className="eyebrow">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          {slide.body && <p>{slide.body}</p>}
          {slide.points && <ul>{slide.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        </div>
      </main>
      <footer><button type="button" onClick={() => onIndex(Math.max(0, index - 1))} disabled={index === 0}>← Anterior</button><span>Usa ← → o la barra espaciadora</span><button type="button" onClick={() => onIndex(Math.min(slides.length - 1, index + 1))} disabled={index === slides.length - 1}>Siguiente →</button></footer>
    </div>
  );
}

export default function Home() {
  const { progress, visit, answer, reflect, complete, reset } = useCourseProgress();
  const [activeId, setActiveId] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [presentationIndex, setPresentationIndex] = useState(0);

  const completedModules = progress.completed.filter((id) => modules.some((module) => module.id === id)).length;
  const progressPercent = Math.round((completedModules / modules.length) * 100);
  const activeModule = modules.find((module) => module.id === activeId);
  const presentationSlides = useMemo(() => makePresentationSlides(activeId), [activeId]);

  const navigate = useCallback((id: string) => {
    setActiveId(id);
    visit(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [visit]);

  const openPresentation = useCallback(async () => {
    setPresentationIndex(0);
    setPresentationOpen(true);
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen can be denied by the browser; the overlay still provides presentation mode.
    }
  }, []);

  const closePresentation = useCallback(async () => {
    setPresentationOpen(false);
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {
      // The presentation overlay closes even if the fullscreen API is unavailable.
    }
  }, []);

  return (
    <div className="course-app">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <Sidebar activeId={activeId} completed={progress.completed} open={menuOpen} onNavigate={navigate} onClose={() => setMenuOpen(false)} />
      <div className="app-shell">
        <CourseHeader progressPercent={progressPercent} mode={presentationOpen ? "presentacion" : "estudio"} onToggleMode={presentationOpen ? closePresentation : openPresentation} onOpenMenu={() => setMenuOpen(true)} />
        <main id="main-content" tabIndex={-1}>
          {activeId === "inicio" && <HomePage onNavigate={navigate} completed={progress.completed} last={progress.last} />}
          {activeId === "introduccion" && <IntroductionPage onNavigate={navigate} />}
          {activeModule && <ModulePage module={activeModule} progress={progress} onAnswer={answer} onReflect={reflect} onComplete={complete} onNavigate={navigate} />}
          {activeId === "cierre" && <ClosingPage progress={progress} onAnswer={answer} onReset={() => { reset(); setActiveId("inicio"); }} />}
        </main>
        <footer className="site-footer"><span>Maestría en Intervención Psicosocial</span><span>El progreso se guarda localmente. No se recopilan datos personales.</span></footer>
      </div>
      {presentationOpen && <PresentationMode slides={presentationSlides} index={presentationIndex} onIndex={setPresentationIndex} onExit={closePresentation} />}
    </div>
  );
}
