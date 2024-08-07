import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Tabs from "../../components/Tabs";
import ResourcePage from "./ResourcePage";
import toast from "react-hot-toast";

const sampleData = [
  {
    id: 1,
    title: "Introduction to React",
    type: "video",
    url: "https://www.youtube.com/watch?v=0MlT74DrG2U",
    time: 1686864000000, // Equivalent to '2023-06-15'
    likes: 120,
    dislikes: 5,
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJEtMjTZY727HRUHi76Du6M7vuPI5eYq9CQ&s", // Sample image URL
  },
  {
    id: 2,
    title: "React Fundamentals",
    type: "video",
    url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    time: 1684598400000, // Equivalent to '2023-05-20'
    likes: 200,
    dislikes: 10,
    pages: 0,
  },
  {
    id: 3,
    title: "Computer Science Basics",
    type: "document",
    url: "https://www.example.com/document.pdf",
    time: 1681920000000, // Equivalent to '2023-04-15'
    likes: 150,
    dislikes: 20,
    pages: 50,
    thumbnailUrl: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    type: "document",
    url: "https://www.example.com/document.pdf",
    time: 1679241600000, // Equivalent to '2023-03-10'
    likes: 100,
    dislikes: 15,
    pages: 100,
    thumbnailUrl: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: 5,
    title: "React Native Tutorial",
    type: "video",
    url: "https://www.youtube.com/watch?v=0MlT74DrG2U",
    time: 1676563200000, // Equivalent to '2023-02-03'
    likes: 250,
    dislikes: 30,
    thumbnailUrl: 'https://picsum.photos/200/300?random=3',
  },
  {
    id: 6,
    title: "Java Programming",
    type: "document",
    url: "https://www.example.com/document.pdf",
    time: 1673884800000, // Equivalent to '2023-01-01'
    likes: 300,
    dislikes: 25,
    pages: 150,
    thumbnailUrl: 'https://picsum.photos/200/300?random=4',
  },
  {
    id: 7,
    title: "Python Programming",
    type: "document",
    url: "https://www.example.com/document.pdf",
    time: 1671206400000, // Equivalent to '2022-12-01'
    likes: 350,
    dislikes: 35,
    pages: 200,
    thumbnailUrl: 'https://picsum.photos/200/300?random=5',
  },
  {
    id: 8,
    title: "JavaScript Fundamentals",
    type: "document",
    url: "https://www.example.com/document.pdf",
    time: 1668528000000, // Equivalent to '2022-11-01'
    likes: 400,
    dislikes: 40,
    pages: 250,
    thumbnailUrl: 'https://picsum.photos/200/300?random=6',
  }
];
  
    

const StudyResources = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ["all", "documents", "ebook", "note", "video", "slide"];
  const [selectedTab, setSelectedTab] = useState(resourceId || "all");

  useEffect(() => {
    setLoading(true);
    const loadingToast = toast.loading("Loading resources...");
    setError(null);
    // Mock API call
    setTimeout(() => {
      setData(sampleData);
      toast.dismiss(loadingToast);
      toast.success("Resources loaded successfully!");
      setLoading(false);
    }, 1000);
  }, [resourceId]);

  useEffect(() => {
    if (selectedTab !== resourceId) {
      navigate(`/study-resources/${selectedTab}`);
    }
  }, [selectedTab, resourceId, navigate]);

  return (
    <div className="study-resources">
      <div className="pt-10">
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          variant=""
        />
      </div>

      {error && <p>{error}</p>}
      <ResourcePage data={data} loading={loading} />
    </div>
  );
};

export default StudyResources;
