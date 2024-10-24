import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import NewPosts from './NewPosts';
import { Link } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchedPosts = [
      {
        author: 'John Doe',
        authorAvatar: 'https://img.freepik.com/premium-photo/technical-writer-digital-avatar-generative-ai_934475-8999.jpg',
        date: 'August 01, 2024',
        image: 'https://www.inclusivecapitalism.com/wp-content/uploads/2021/09/11-Preserve-biodiversity-shutterstock_287669591_600x400.jpg',
        content: 'Our team is working hard to restore natural habitats and promote biodiversity...',
        likes: 12,
        dislikes: 2,
        comments: [
          {
            name: 'Alice Johnson',
            avatar: 'https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg',
            text: 'Incredible effort!',
          },
          {
            name: 'Bob',
            avatar: 'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg',
            text: 'Great Spirit!',
          },
        ],
      },
      {
        author: 'Gwen Stacy',
        authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOVuKnfDZtbigORGy_PggHgkpudc31UiyG9g&s',
        date: 'September 04, 2024',
        image: 'https://www.shutterstock.com/image-photo/two-farmers-field-examining-soy-260nw-2178211793.jpg',
        content: 'Today we met two people who are preserving a forest in South Africa around 20 years and many companies are supporting them.',
        likes: 30,
        dislikes: 2,
        comments: [
          {
            name: 'Forbes',
            avatar: 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
            text: 'Well Done!',
          },
          {
            name: 'Costa ',
            avatar: 'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg',
            text: 'We really need these kind of people in our world.',
          },
        ],
      },
      {
        author: 'EcoSave',
        authorAvatar: 'https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/87b9b420-f858-48c8-93d6-31aa25c79faa/avatar2.jpg',
        date: 'September 04, 2024',
        image: 'https://trellis.net/wp-content/uploads/2024/07/FloatingSolar_setsoPhoto_sstock1470.jpg',
        content: 'We are thrilled to announce that we are going to open a solar panel farm.',
        likes: 14,
        dislikes: 0,
        comments: [
          {
            name: 'Johnson',
            avatar: 'https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg',
            text: 'Great Thinking!',
          },
          {
            name: 'Cassy ',
            avatar: 'https://cdn5.vectorstock.com/i/1000x1000/78/44/avatar-girl-cartoon-vector-42477844.jpg',
            text: 'It is very important step for preserving enviroment.',
          },
        ],
      },
      {
        author: 'Innovative Tech',
        authorAvatar: 'https://miro.medium.com/v2/resize:fit:793/1*hAOerXipVnYkDPjY_ZUMJA.jpeg',
        date: 'September 14, 2024',
        image: 'https://media.istockphoto.com/id/1361579243/photo/uk-domestic-smart-meter-display.jpg?s=612x612&w=0&k=20&c=Y2tI5o-TkHO6Tn2z3UAo-RnWZM-mbuQy_soz4o-XP0I=',
        content: 'We have created a tool that will gonna measure the number of carbon emissions done by a company.',
        likes: 19,
        dislikes: 2,
        comments: [
          {
            name: 'Massy',
            avatar: 'https://cdn5.vectorstock.com/i/1000x1000/78/44/avatar-girl-cartoon-vector-42477844.jpg',
            text: 'Nice Work!',
          },
          {
            name: 'Diego',
            avatar: 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
            text: 'Companies should know that how much thay are disturbing the enviroment.',
          },
        ],
      },
    ];

    setPosts(fetchedPosts);
  }, []);

  return (
    <div className='h-full w-full' style={{ background: 'radial-gradient(circle,#8FD14F,beige)'}}>
      <div className="w-[1170px] h-full ml-[140px] p-4" >
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
        <button
          onClick={NewPosts}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gray-500 text-white text-3xl font-bold flex items-center justify-center shadow-lg hover:bg-black transition-colors duration-200"
          aria-label="Add New Post"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PostPage;