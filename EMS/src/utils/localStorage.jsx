const employees = [
    {
      id: 1,
      email: "employee1@example.com",
      password: "123",
      tasks: [
        {
          title: "Complete report",
          description: "Finish the quarterly financial report",
          date: "2025-01-28",
          category: "Finance",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
        {
          title: "Team meeting",
          description: "Discuss project progress with the team",
          date: "2025-01-29",
          category: "Meetings",
          active: true,
          newTask: false,
          completed: false,
          failed: false,
        },
        {
          title: "Update CRM",
          description: "Ensure all client information is up-to-date",
          date: "2025-01-30",
          category: "Administration",
          active: false,
          newTask: false,
          completed: true,
          failed: false,
        },
      ],
    },
    {
      id: 2,
      email: "employee2@example.com",
      password: "123",
      tasks: [
        {
          title: "Website update",
          description: "Fix bugs and update content on the website",
          date: "2025-01-27",
          category: "Development",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
        {
          title: "Prepare slides",
          description: "Create presentation slides for the client meeting",
          date: "2025-01-28",
          category: "Presentation",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
        {
          title: "Email follow-ups",
          description: "Send follow-up emails to potential leads",
          date: "2025-01-26",
          category: "Sales",
          active: false,
          newTask: false,
          completed: true,
          failed: false,
        },
      ],
    },
    {
      id: 3,
      email: "employee3@example.com",
      password: "123",
      tasks: [
        {
          title: "Inventory check",
          description: "Verify stock levels and reorder if necessary",
          date: "2025-01-25",
          category: "Operations",
          active: false,
          newTask: false,
          completed: true,
          failed: false,
        },
        {
          title: "Client onboarding",
          description: "Assist with onboarding new clients",
          date: "2025-01-27",
          category: "Client Services",
          active: true,
          newTask: false,
          completed: false,
          failed: false,
        },
        {
          title: "System upgrade",
          description: "Upgrade internal systems to the latest version",
          date: "2025-01-31",
          category: "IT",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
      ],
    },
    {
      id: 4,
      email: "employee4@example.com",
      password: "123",
      tasks: [
        {
          title: "Market research",
          description: "Analyze competitor strategies",
          date: "2025-01-26",
          category: "Research",
          active: false,
          newTask: false,
          completed: true,
          failed: false,
        },
        {
          title: "Host webinar",
          description: "Organize and host the marketing webinar",
          date: "2025-01-28",
          category: "Marketing",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
        {
          title: "Data cleanup",
          description: "Clean up outdated entries in the database",
          date: "2025-01-30",
          category: "Administration",
          active: true,
          newTask: false,
          completed: false,
          failed: false,
        },
      ],
    },
    {
      id: 5,
      email: "employee5@example.com",
      password: "123",
      tasks: [
        {
          title: "Policy review",
          description: "Review and update company policies",
          date: "2025-01-27",
          category: "HR",
          active: true,
          newTask: true,
          completed: false,
          failed: false,
        },
        {
          title: "Training session",
          description: "Conduct training for new employees",
          date: "2025-01-29",
          category: "Training",
          active: true,
          newTask: false,
          completed: false,
          failed: false,
        },
        {
          title: "Expense analysis",
          description: "Prepare a detailed analysis of recent expenses",
          date: "2025-01-28",
          category: "Finance",
          active: false,
          newTask: false,
          completed: true,
          failed: false,
        },
      ],
    },
  ];
  
  const admin = [
    {
      id: 1,
      email: "admin@example.com",
      password: "123",
    },
  ];
  
//   console.log({ employees, admin });

export const setLocalStorage = () => {
    localStorage.setItem("Employees", JSON.stringify(employees));
    localStorage.setItem("Admin", JSON.stringify(admin));
}
export const getLocalStorage = () => {
    // localStorage.setItem("Employees", employees)
}
  