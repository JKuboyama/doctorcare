window.addEventListener('scroll', onScroll)
onScroll()
/*Essa serve pra adicionar um evento que, nesse caso, é:
  add o onScroll quando tiver um scroll na tela
  Chama a função apenas 1 vez e já é

  template:
  addEventListener('event', nome da função)
*/

function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

//para deixar marcado na barra de nav quando tiver na seção específica
function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2 //innerHeight é a parte visualizável da viewport

  //verificar se a seção passou da linha
  //quais dados vou precisar?
  //offsetTop mostra onde começa o topo da seção
  const sectionTop = section.offsetTop
  //offsetHeight mostra a altura da sessão, mostrando o ponto do scroll onde fica o fim dela
  const sectionHeight = section.offsetHeight

  //o topo da seção chegou ou passou a linha alvo
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop

  //verificar se a base da seção tá abaixo da linha
  //quais dados?
  const sectionEndsAt = sectionTop + sectionHeight

  //o fim da seção passou da linha alvo?
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

  //limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

//função pra mudar a cor da barra de nav quando começar a rolar a pág
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}
/*
O que fizemos:
pegou o id navigation, acessou a lista de classes dele e comandou:
quando scrollY (rolagem no eixo Y) for maior que 0, adiciona lá no html a classe 'scroll'. Ao add essa classe, a barra de nav fica verde.
Se não tiver rolamento, remover a classe scroll, que fará a barra de nav ficar branca.
*/

//função pra fazer o botão back to top aparecer quando tiver numa determinada altura da página
function showBackToTopButtonOnScroll() {
  if (scrollY > 500) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

//isso serve pra criar a animação quando abrir a página do site
ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(
  '#home, #home img, #home .stats, #services, #services header, #services .card, #about, #about header, #about .content'
)
