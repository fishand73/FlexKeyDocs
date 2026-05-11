(function () {
  const body = document.body;
  const toggle = document.getElementById('sidebar-toggle');
  const scrim = document.getElementById('sidebar-scrim');
  const search = document.getElementById('doc-search');
  const links = Array.from(document.querySelectorAll('.sidebar-link'));
  const content = document.getElementById('doc-content');
  const toc = document.getElementById('page-toc');

  function closeSidebar() {
    body.classList.remove('sidebar-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const open = body.classList.toggle('sidebar-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (scrim) {
    scrim.addEventListener('click', closeSidebar);
  }

  links.forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  if (search) {
    search.addEventListener('input', function () {
      const query = search.value.trim().toLowerCase();
      links.forEach(function (link) {
        const haystack = `${link.dataset.title || ''} ${link.dataset.description || ''}`;
        link.hidden = query.length > 0 && !haystack.includes(query);
      });
    });
  }

  if (content && toc) {
    const headings = Array.from(content.querySelectorAll('h2, h3'));
    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = `section-${index + 1}`;
      }
      const item = document.createElement('a');
      item.href = `#${heading.id}`;
      item.textContent = heading.textContent;
      item.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
      toc.appendChild(item);
    });

    if (headings.length === 0) {
      toc.parentElement.hidden = true;
    }
  }

  document.querySelectorAll('.doc-content table').forEach(function (table) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  document.querySelectorAll('pre').forEach(function (pre) {
    const code = pre.querySelector('code');
    if (!code) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'copy-code';
    button.type = 'button';
    button.textContent = '复制';
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        button.textContent = '已复制';
        window.setTimeout(function () {
          button.textContent = '复制';
        }, 1400);
      });
    });
    pre.appendChild(button);
  });
})();
