// overload the node list prototype to use it as an array
NodeList.prototype.find = Array.prototype.find;

// add ui for user menu
document.body.addEventListener('click',() => {
  const TeleportButtonText = 'Teleport to';
setTimeout(() => {
  const doc = document.querySelector("#root > div > div > div.css-1ckauce > div:nth-child(2) > div.Layout.center-y > div");
  const player = getPlayer();
  if (doc && !doc.childNodes.find(cn => cn.innerText === TeleportButtonText)) {
    const name = document.querySelector("#root > div > div > div.css-1ckauce > div:nth-child(2) > div.Layout.center-y > div > div:nth-child(4) > div > p").innerText;
    if (name !== player.name && name !== `${player.name} ${player.emojiStatus}`) {
      doc.innerHTML += '<div class="Layout css-1tjixaa" tabindex="0" style="display: flex; align-items: center; width: 100%;"><div class="css-1etbslx"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe fa-w-16 fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><<path fill="currentColor" d="m156.433594 167.203125h15v49.226563h-15zm0 0"/><path fill="currentColor" d="m156.433594 497h-22.933594l-6.082031-6.082031v-180.640625h-39.386719v180.640625l-6.082031 6.082031h-22.933594v-329.796875h-15v138.359375h-17.519531l-11.496094-11.5v-80.515625h-15v86.730469l20.285156 20.285156h23.730469v191.4375h44.148437l14.867188-14.871094v-171.851562h9.386719v171.851562l14.871093 14.871094h44.144532v-105.53125h-15zm0 0"/><path fill="currentColor" d="m143.515625 114.558594v-9.914063l14.820313-14.820312v-39.214844c0-27.90625-22.703126-50.609375-50.609376-50.609375s-50.613281 22.703125-50.613281 50.609375v6.105469h15v-6.105469c0-19.632813 15.976563-35.609375 35.613281-35.609375 19.636719 0 35.609376 15.976562 35.609376 35.609375v33l-22.679688 22.679687h-25.863281l-22.679688-22.679687v-6.894531h-15v13.109375l14.824219 14.820312v9.914063h-47.394531l-24.542969 24.539062v54.449219h15v-48.234375l15.753906-15.753906h56.183594v-9.914063l1.644531 1.644531h38.289063l1.644531-1.644531v9.914063h56.183594l15.753906 15.753906v148.75l-11.496094 11.5h-17.519531v-69.132812h-15v150.039062h15v-65.90625h23.730469l20.285156-20.285156v-161.179688l-24.542969-24.539062zm0 0"/><path fill="currentColor" d="m487.457031 114.558594h-47.394531v-9.914063l14.820312-14.820312v-39.214844c.003907-27.90625-22.703124-50.609375-50.609374-50.609375-22.59375 0-41.777344 14.882812-48.261719 35.355469h-103.867188v15h101.519531v.253906 38.03125h-53.796874v15h67.613281l1.003906 1.003906v9.910157h-47.394531l-24.542969 24.542968v2.832032h-50.691406v15h50.691406v38.285156h-26.691406v15h26.691406v38.285156h-44.40625v15h44.40625v36.777344l1.511719 1.507812h-23.105469v15h38.105469l3.773437 3.773438h23.734375v34.511718h-113.566406v15h113.566406v38.285157h-53.035156v15h53.035156v38.285156h-88.425781v15h88.425781v35.359375h44.144532l14.871093-14.871094v-171.851562h9.386719v171.851562l14.867188 14.871094h44.148437v-191.4375h23.730469l20.285156-20.285156v-161.179688zm-118.792969-63.949219c0-19.632813 15.976563-35.609375 35.609376-35.609375 19.636718 0 35.609374 15.976562 35.609374 35.609375v33l-22.679687 22.679687h-25.863281l-22.679688-22.679687v-33zm-57.117187 243.453125v-28.363281h29.019531v39.859375h-17.519531zm73.035156 196.855469-6.085937 6.082031h-22.929688v-41.644531h29.015625zm68.402344 6.082031h-22.933594l-6.082031-6.082031v-35.5625h29.015625zm44.015625-202.9375-11.496094 11.496094-17.519531.003906v-39.863281h29.015625zm-29.015625-43.363281v-83.496094h-15v273.152344h-29.019531v-130.078125h-39.386719v130.078125h-29.015625v-273.152344h-15v83.496094h-29.015625v-105.386719l15.753906-15.753906h56.183594v-9.914063l1.644531 1.644531h38.289063l1.644531-1.644531v9.914063h56.183594l15.753906 15.753906v105.386719zm0 0"/><path fill="currentColor" d="m368.066406 279.535156h72.417969v15h-72.417969zm0 0"/><path fill="currentColor" d="m368.066406 250.535156h72.417969v15h-72.417969zm0 0"/><path fill="currentColor" d="m365.960938 166.019531v44.242188l38.3125 22.125 38.316406-22.125v-44.242188l-38.316406-22.121093zm61.628906 35.585938-23.316406 13.460937-23.3125-13.460937v-26.921875l23.3125-13.460938 23.316406 13.460938zm0 0"/><path fill="currentColor" d="m415.261719 94.09375-10.605469-10.605469 10.230469-10.230469v-1.097656h1.097656l1.101563-1.101562 1.097656 1.101562h11.703125v7.308594zm14.625-31.9375h-15v-11.546875c0-.675781-.066407-1.351563-.191407-2.011719l14.730469-2.835937c.304688 1.589843.460938 3.222656.460938 4.847656zm-17.800781-18.714844c-2.039063-2.21875-4.8125-3.441406-7.8125-3.441406v-15c7.140624 0 14.015624 3.023438 18.859374 8.296875zm0 0"/><path fill="currentColor" d="m491 233.199219h-15v-30.640625h15zm0-40.636719h-15v-15h15zm0-25h-15v-15h15zm0 0"/><path fill="currentColor" d="m446.984375 415.855469h-15v-30.636719h15zm0-40.636719h-15v-15h15zm0-25h-15v-15h15zm0 0"/></svg></div><p class="Text h5 normal" style="color: white;">Teleport to</p></div>'
      doc.childNodes.find(cn => cn.innerText === TeleportButtonText).addEventListener('click', ()=> teleportToPlayer(name))
    }
  }
}, 200)
})