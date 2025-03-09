document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const previewContent = document.getElementById('previewContent');
    const clearFormBtn = document.getElementById('clearForm');
    const educationContainer = document.getElementById('educationContainer');
    const experienceContainer = document.getElementById('experienceContainer');

    
    let educationCount = 0;
    let experienceCount = 0;

    function updatePreview() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const summary = document.getElementById('summary').value;
        const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(skill => skill).join(', ');

        previewContent.innerHTML = `
            <h3>${name}</h3>
            <p>${email} | ${phone}</p>
            <h4>Profile Summary</h4>
            <p>${summary}</p>
            <h4>Skills</h4>
            <p>${skills}</p>
            <h4>Education</h4>
            <div id="educationList"></div>
            <h4>Experience</h4>
            <div id="experienceList"></div>
        `;

        const educationList = document.getElementById('educationList');
        const experienceList = document.getElementById('experienceList');

        for (let i = 0; i < educationCount; i++) {
            const eduInput = document.getElementById(`edu${i}`);
            if (eduInput) {
                educationList.innerHTML += `<p>${eduInput.value}</p>`;
            }
        }

       

    }
    


    document.getElementById('addEducation').addEventListener('click', () => {
        educationCount++;
        const newEdu = document.createElement('input');
        newEdu.type = 'text';
        newEdu.id = `edu${educationCount - 1}`;
        newEdu.placeholder = 'Enter Education Details';
        newEdu.addEventListener('input', updatePreview);
        educationContainer.appendChild(newEdu);
        updatePreview();
    });

    document.getElementById('addExperience').addEventListener('click', () => {
        experienceCount++;
        const newExp = document.createElement('input');
        newExp.type = 'text';
        newExp.id = `exp${experienceCount - 1}`;
        newExp.placeholder = 'Enter Experience Details';
        newExp.addEventListener('input', updatePreview);
        experienceContainer.appendChild(newExp);
        updatePreview();
    });

    resumeForm.addEventListener('input', updatePreview);

    clearFormBtn.addEventListener('click', () => {
        resumeForm.reset();
        previewContent.innerHTML = '';
        educationContainer.querySelectorAll('input').forEach(input => input.remove());
        experienceContainer.querySelectorAll('input').forEach(input => input.remove());
        educationCount = 0;
        experienceCount = 0;
    });

 
    document.getElementById('resumeForm').addEventListener('submit', function (event) {
        event.preventDefault(); 
        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();
        doc.text(previewContent.innerText, 10, 10);
        doc.save('resume.pdf');
    });
});
