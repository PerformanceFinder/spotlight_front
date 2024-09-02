"use client";

import { useState } from "react";



export function FormPage() {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenData = sessionStorage.getItem('tokenData');
      console.log(tokenData);
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlays, setSelectedPlays] = useState([]);
  
  const categories = [
    { id: "all", name: "All" },
    { id: "drama", name: "Drama" },
    { id: "comedy", name: "Comedy" },
    { id: "musical", name: "Musical" },
    { id: "tragedy", name: "Tragedy" },
  ];

  const plays = [
    {
      id: 1,
      title: "Hamlet",
      category: "drama",
      image: "/placeholder.svg",
      description: "A classic Shakespearean tragedy about a prince seeking revenge.",
    },
    {
      id: 2,
      title: "The Importance of Being Earnest",
      category: "comedy",
      image: "/placeholder.svg",
      description: "A witty and satirical comedy of manners by Oscar Wilde.",
    },
    {
      id: 3,
      title: "Les Misérables",
      category: "musical",
      image: "/placeholder.svg",
      description: "A sweeping musical drama set in 19th-century France.",
    },
    {
      id: 4,
      title: "Oedipus Rex",
      category: "tragedy",
      image: "/placeholder.svg",
      description: "A Greek tragedy about a man who unknowingly fulfills a prophecy.",
    },
    {
      id: 5,
      title: "A Midsummer Night's Dream",
      category: "comedy",
      image: "/placeholder.svg",
      description: "A whimsical Shakespearean comedy about love and magic.",
    },
    {
      id: 6,
      title: "Fiddler on the Roof",
      category: "musical",
      image: "/placeholder.svg",
      description: "A beloved musical about a Jewish family in early 20th-century Russia.",
    },
  ];

  const filteredPlays = selectedCategory === "all" ? plays : plays.filter((play) => play.category === selectedCategory);

  const handlePlaySelection = (playId) => {
    if (selectedPlays.includes(playId)) {
      setSelectedPlays(selectedPlays.filter((id) => id !== playId));
    } else {
      setSelectedPlays([...selectedPlays, playId]);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md transition-colors hover:bg-muted ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlays.map((play) => (
            <div
              key={play.id}
              className={`bg-card rounded-lg overflow-hidden shadow-sm group ${
                selectedPlays.includes(play.id) ? "relative" : ""
              }`}
              onClick={() => handlePlaySelection(play.id)}
            >
              <div
                className={`w-full h-48 object-cover transition-opacity duration-300 ${
                  selectedPlays.includes(play.id) ? "opacity-50" : ""
                }`}
              >
                <img
                  src={play.image}
                  alt={play.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
              </div>
              {selectedPlays.includes(play.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-4">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{play.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {play.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
