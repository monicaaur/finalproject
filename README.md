# Final Project

# Library
- Axios (npm install axios)
- Formik (npm install formik --save)
- Yup (npm install yup --save)
- React Router (npm i react-router-dom)
- React Bootstrap (npm install react-bootstrap bootstrap)

# Pages
- Home.jsx untuk halaman Home, Explore.jsx untuk halaman Explore
- SignIn/SignIn.jsx untuk halaman Sign In
- SignUp/SignUp.jsx untuk halaman Sign Up
- Profile/MyProfile.jsx untuk halaman profile pengguna yang sedang sign in
- Profile/UserProfile.jsx untuk halaman profile pengguna lainnya

# Component
- Navibar/Navibar.jsx untuk Navigation Bar
- LeftSideMenu/LeftSideMenu.jsx untuk menu yang ada di kiri halaman utama
- CreatePost/CreatePost.jsx merupakan child component untuk LeftSideMenu.jsx, sebagai komponen untuk membuat postingan
- RightSideComponent/RightSideComponent.jsx untuk komponen yang ada di kanan halaman utama
- TimelinePost/TimelinePost.jsx merupakan child component dari Home.jsx dan Explore.jsx yang menampilkan timeline post Home dan Explore
- Comment/TimelinePostComment/TimelinePostComment.jsx merupakan child component dari TimelinePost.jsx, sebagai komponen untuk menampilkan komentar pada postingan di timeline
- EditProfileBtn/EditProfileBtn.jsx merupakan child component untuk MyProfile.jsx, sebagai komponen untuk memperbarui data profil
- FollowersFollowing/MyFollowers.jsx dan MyFollowing.jsx merupakan child component untuk MyProfile.jsx, sebagai komponen untuk menampilkan list Followers dan Following kita
- Comment/ProfilePostComment/ProfilePostComment.jsx merupakan child component untuk MyProfile.jsx dan UserProfile.jsx, sebagai komponen untuk menampilkan komentar pada postingan di halaman profile
- UpdatePost/UpdatePost.jsx merupakan komponen untuk memperbarui postingan
- DeletePost/DeletePost.jsx merupakan child component untuk MyProfile.jsx, sebagai komponen untuk menghapus postingan
- FollowersFollowing/UserFollowers.jsx dan UserFollowing.jsx merupakan child component untuk UserProfile.jsx, sebagai komponen untuk menampilkan list Followers dan Following user
- FollowUnfollow/FollowUnfollow.jsx merupakan child component untuk UserProfile.jsx, sebagai komponen untuk button follow dan unfollow