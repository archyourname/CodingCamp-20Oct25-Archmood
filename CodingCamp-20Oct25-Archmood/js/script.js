        document.querySelectorAll('.navbar a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Validasi Form
        document.querySelector('.contact form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! (This is a demo)');
        });

        // Fungsi Carousel
        let currentIndex = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            const carousel = document.getElementById('carousel');
            carousel.style.transform = `translateX(-${index * 100}%)`;
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        // Auto-slide setiap 2 seconds
        setInterval(nextSlide, 2000);

        const sectionsWithBg = document.querySelectorAll('.home');
        sectionsWithBg.forEach(section => {
            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const moveX = (x - centerX) / centerX * 10;
                const moveY = (y - centerY) / centerY * 10;
                section.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
            });
            section.addEventListener('mouseleave', () => {
                section.style.backgroundPosition = 'center center';
            });
        });

    let startX = 0;
    const carousel = document.getElementById('carousel');
    carousel.addEventListener('touchstart', (e) => {
       startX = e.touches[0].clientX;
     });
    carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    if (Math.abs(diffX) > 50) {  
         if (diffX > 0) nextSlide();  
         else prevSlide();  
       }
     });
     
     document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Menampilkan data output
            document.getElementById('outputName').textContent = `Name: ${name}`;
            document.getElementById('outputEmail').textContent = `Email: ${email}`;
            document.getElementById('outputMessage').textContent = `Message: ${message}`;
            document.getElementById('formOutput').style.display = 'block';
            
            // Reset form
            this.reset();
        });