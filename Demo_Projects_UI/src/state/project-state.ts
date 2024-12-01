import { ProjectStatus, Project } from "../models/project";

//Project State Managment

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; // protected allows inherited classes to reach this field

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//
export class ProjectState extends State<Project> {
  private projects: Project[] = []; // Store projects here
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInsatnce() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject); // Add the project to the list
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // slice() to return only coopy of that array
    }
  }
}

export const projectState = ProjectState.getInsatnce(); // garantte that i will have only one object to woriking with .... about state of the project
