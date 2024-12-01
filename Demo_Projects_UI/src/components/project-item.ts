import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";
import { Autobind } from "../decorators/autobind";

// class ProjectItem
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    // dataTransfer is a property to the draggable evends and store data durig tnhe draggable evend and make sure thath the data is the same when the data has been droped
  }
  @Autobind
  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + "assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
