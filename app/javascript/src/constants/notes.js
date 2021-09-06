export default {
  NOTES: [
    {
      id: 1,
      title: "First task",
      description: "Choose the Right App",
      tags: "Internal",
      createdDate: "Aug 21, 2021",
      dueDate: "Sep 2, 2021",
      contact: "John Dae"
    },
    {
      id: 2,
      title: "Second task",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      tags: "Agile Workflow",
      createdDate: "Aug 20, 2021",
      dueDate: "",
      contact: "Mr Nobody"
    },
    {
      id: 3,
      title: "Third task",
      description: "Make More Than One List, Make More Than One List",
      tags: "Bug",
      createdDate: "Aug 20, 2021",
      dueDate: "",
      contact: "Mr Nobody"
    }
  ],
  SORT_BY_OPTIONS: [
    { label: "Title", value: "title" },
    { label: "Created Date", value: "createdDate" },
    { label: "Due Date", value: "dueDate" }
  ],
  TAGS: [
    { label: "Bug", value: "bug" },
    { label: "Internal", value: "internal" },
    { label: "Agile Workflow", value: "Agile Workflow" }
  ],
  CONTACTS: [
    { label: "Mr Nobody", value: "Mr Nobody" },
    { label: "John Doe", value: "John Doe" }
  ]
};
