function enviar(e) {
    e.preventDefault()
    const form = e.target
    // const form = document.querySelector('form[name="meu-form"]')
    const formData = new FormData(form)
    console.log(formData.get('nome'))
    console.log(formData.get('descricao'))
}

localStorage.setItem('tasks', JSON.stringify(formData));