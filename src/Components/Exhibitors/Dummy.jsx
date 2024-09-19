import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";

const members = [
  {
    _id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+44 1233 123456",
    status: true,
    profileImage:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    address: "123 Main St London WC2N 5DU UK",
    jobTitle: "Software Engineer",
    company: "Meta Logix Tech",
    bio: "John is a skilled software engineer with over 10 years of experience in full-stack development. He enjoys working with the latest technologies and building innovative applications.",
  },
  {
    _id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phoneNumber: "+1 555 123 4567",
    status: false,
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    address: "456 Oak Ave New York 10001 USA",
    jobTitle: "Product Manager",
    company: "Dynamite Lifestyle",
    bio: "Jane is a seasoned product manager with a passion for bringing ideas to life. She excels at leading cross-functional teams and delivering high-quality products.",
  },
  // ... more data
];

function Dummy() {
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "testing@testing.com",
      phoneNumber: "+44 1233 123456",
      firstName: "John",
      lastName: "Doe",
    },
  ]);
  // const [searchText, setSearchText] = useState("");
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(1);
  // const [totalCount, setTotalCount] = useState(0);
  // const [totalPages, setTotalPages] = useState(2);

  // const handleChangePage = (newPage) => {
  //   if (newPage == 1) {
  //     setUsers([members[1]]);
  //   } else {
  //     setUsers([members[0]]);
  //   }
  //   setPage(newPage);
  // };

  const handleEdit = (value) => {
    console.log(value, "---value");
  };

  const handleDelete = (value) => {
    console.log(value, "---value");
  };

  useEffect(() => {
    fetch("http://localhost:8000/exhibitors", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        const arr = data.map((item) => {
          return {
            ...item,
            name: item.name + " " + item.lastName,
          };
        });
        setUsers(arr);
      });
  }, []);

  const TABLE_HEAD = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    {
      id: "actions",
      label: "Actions",
      type: "actions",
      actions: ["edit", "delete"],
      renderData: (row) => {
        return (
          <div>
            <>
              <button>edit</button>
              <button>del</button>
            </>
          </div>
        );
      },
    },
  ];

  return (
    <div className="Dummy">
      <ReactTable
        data={users} // required
        TABLE_HEAD={TABLE_HEAD} // required
        is_hide_search={true}
        theme_config={{
          background: "#fafafa",
          color: "#000",
          iconColor: "#5792c9",
        }}
      />
    </div>
  );
}

export default Dummy;
