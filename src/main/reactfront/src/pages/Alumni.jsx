import React from "react";

const researchers = [
    {
      name: "Dr. Jane Doe",
      title: "Principal Investigator",
      description: "Expert in molecular biology and genetics.",
      image: "../assets/winter1.jpg",
    },
    {
      name: "John Smith",
      title: "Postdoctoral Fellow",
      description: "Focuses on bioinformatics and computational biology.",
      image: "../assets/winter1.jpg",
    },
    {
      name: "Emily Johnson",
      title: "PhD Student",
      description: "Works on cell signaling pathways.",
      image: "../assets/winter1.jpg",
    },
    {
        name: "Dr. Jane Doe",
        title: "Principal Investigator",
        description: "Expert in molecular biology and genetics.",
        image: "../assets/winter1.jpg",
      },
      {
        name: "John Smith",
        title: "Postdoctoral Fellow",
        description: "Focuses on bioinformatics and computational biology.",
        image: "../assets/winter1.jpg",
      },
      {
        name: "Emily Johnson",
        title: "PhD Student",
        description: "Works on cell signaling pathways.",
        image: "../assets/winter1.jpg",
      },
  ];

  export default function Alumni() {
    return (
      <div className="min-h-screen py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Alumnis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {researchers.map((researcher, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={researcher.image}
                alt={researcher.name}
                className="w-full h-128"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{researcher.name}</h2>
                <p className="text-sm text-gray-600">{researcher.title}</p>
                <p className="text-sm mt-2">{researcher.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };  
  