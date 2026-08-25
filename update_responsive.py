import os

def update_responsive_sidebar(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update CSS for .sidebar, .tree-item, .caret, .tree-node-icon, .tree-node-title
    old_tree_item_css = '''.tree-item {
      padding: 6px 8px;
      margin-bottom: 2px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      user-select: none;
    }
    .caret {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
    }'''

    new_tree_item_css = '''.sidebar {
      width: var(--sidebar-width);
      min-width: 180px;
      max-width: 85vw;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      z-index: 10;
      transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
    }
    .tree-item {
      padding: 6px 8px;
      margin-bottom: 3px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      user-select: none;
      min-height: 34px;
      transition: all 0.15s ease;
    }
    .caret {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .tree-node-icon {
      flex-shrink: 0;
      margin-top: 4px;
      font-size: 0.95rem;
    }
    .tree-node-title {
      font-size: 0.88rem;
      line-height: 1.35;
      word-break: break-word;
      overflow-wrap: anywhere;
      white-space: normal;
      flex-grow: 1;
      padding-left: 2px;
    }'''

    assert old_tree_item_css in content, f'old_tree_item_css not found in {filename}'
    content = content.replace(old_tree_item_css, new_tree_item_css)

    # 2. Update Sidebar Header layout to be 100% clean & responsive
    old_sidebar_header = '''    <div class="sidebar-header p-3 d-flex justify-content-between align-items-center gap-2">
      <button class="btn btn-sm btn-light rounded-pill px-3 shadow-sm border-0" onclick="showDesktop()" title="Kembali ke Beranda">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="flex-grow-1 text-center d-flex align-items-center justify-content-center gap-2">
        <span class="fw-bold small text-uppercase text-white" style="letter-spacing: 1px;">Kit-Naf</span>
        <!-- Zoom Sidebar Controller -->
        <div class="d-flex align-items-center bg-black bg-opacity-25 rounded-pill px-2 py-0 border border-white border-opacity-10" title="Zoom Menu Sidebar (Ctrl + Scroll Mouse di Sidebar)">
          <button class="btn btn-sm btn-link p-0 text-white-50 text-decoration-none px-1" onclick="changeSidebarZoom(-10)" title="Perkecil Teks Sidebar"><i class="fa-solid fa-minus fa-xs"></i></button>
          <span id="sidebarZoomBadge" class="mx-1 small fw-bold text-white user-select-none" style="font-size: 0.7rem; min-width: 32px; text-align: center; cursor: pointer;" onclick="resetSidebarZoom()" title="Klik untuk reset zoom sidebar ke 100%">100%</span>
          <button class="btn btn-sm btn-link p-0 text-white-50 text-decoration-none px-1" onclick="changeSidebarZoom(10)" title="Perbesar Teks Sidebar"><i class="fa-solid fa-plus fa-xs"></i></button>
        </div>
      </div>
      <button class="btn btn-sm btn-primary rounded-pill px-3 shadow-sm" onclick="if(window.activeRootId) openNodeModal(window.activeRootId, 1)" title="Tambah Sub Materi">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>'''

    new_sidebar_header = '''    <div class="sidebar-header p-2 px-3 d-flex flex-column gap-2 border-bottom border-secondary border-opacity-25">
      <div class="d-flex justify-content-between align-items-center w-100">
        <button class="btn btn-sm btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px;" onclick="showDesktop()" title="Kembali ke Beranda">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="text-center px-1 text-truncate">
          <span class="fw-bold small text-uppercase text-white text-nowrap user-select-none" style="letter-spacing: 1px;">Kit-Naf</span>
        </div>
        <button class="btn btn-sm btn-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px;" onclick="if(window.activeRootId) openNodeModal(window.activeRootId, 1)" title="Tambah Sub Materi">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <!-- Zoom Sidebar Controller (Auto-Responsive Row) -->
      <div class="d-flex justify-content-center align-items-center w-100">
        <div class="d-flex align-items-center justify-content-between bg-black bg-opacity-25 rounded-pill px-2 py-1 border border-white border-opacity-10 w-100" style="max-width: 175px;" title="Zoom Menu Sidebar (Ctrl + Scroll Mouse di Sidebar)">
          <button class="btn btn-sm btn-link p-0 text-white-50 text-decoration-none px-2" onclick="changeSidebarZoom(-10)" title="Perkecil Teks Sidebar"><i class="fa-solid fa-minus fa-xs"></i></button>
          <span id="sidebarZoomBadge" class="mx-1 small fw-bold text-white user-select-none" style="font-size: 0.72rem; cursor: pointer;" onclick="resetSidebarZoom()" title="Klik untuk reset zoom sidebar ke 100%">100%</span>
          <button class="btn btn-sm btn-link p-0 text-white-50 text-decoration-none px-2" onclick="changeSidebarZoom(10)" title="Perbesar Teks Sidebar"><i class="fa-solid fa-plus fa-xs"></i></button>
        </div>
      </div>
    </div>'''

    assert old_sidebar_header in content, f'old_sidebar_header not found in {filename}'
    content = content.replace(old_sidebar_header, new_sidebar_header)

    # 3. Update renderTreeNode function to use responsive titles and dashed line positioning
    old_render_node = '''    // Panah/Garis Turunan (Horizontal)
    if (node.level > 0) {
      html += '<div style="position: absolute; left: 0; top: 50%; width: ' + paddingLeft + 'px; border-top: 1px dashed rgba(255,255,255,0.3);"></div>';
    }

    if (hasChildren) {
      html += '<div class="caret" onclick="event.stopPropagation(); toggleExpand(\'' + node.id + '\')">';
      html += '<i class="fa-solid ' + (isExpanded ? 'fa-chevron-down' : 'fa-chevron-right') + ' fa-xs"></i></div>';
    } else {
      html += '<div class="caret"></div>';
    }
    
    // Logic Ikon Sidebar
    var iconName = node.icon || (node.level === 0 ? 'fa-folder' : 'fa-file-lines');
    if (isExpanded && node.level === 0 && (!node.icon || node.icon === 'fa-folder')) {
      iconName = 'fa-folder-open';
    }
    var iconColor = node.level === 0 ? 'text-warning' : 'text-secondary';
    
    html += '<i class="fa-solid ' + iconName + ' mx-2 ' + iconColor + '"></i>';
    html += '<span class="text-truncate flex-grow-1" style="font-size:0.9rem;">' + escapeHTML(node.title) + '</span>';
    html += '</div>';'''

    new_render_node = '''    // Panah/Garis Turunan (Horizontal)
    if (node.level > 0) {
      html += '<div style="position: absolute; left: 0; top: 16px; width: ' + paddingLeft + 'px; border-top: 1px dashed rgba(255,255,255,0.3);"></div>';
    }

    if (hasChildren) {
      html += '<div class="caret" onclick="event.stopPropagation(); toggleExpand(\'' + node.id + '\')">';
      html += '<i class="fa-solid ' + (isExpanded ? 'fa-chevron-down' : 'fa-chevron-right') + ' fa-xs"></i></div>';
    } else {
      html += '<div class="caret"></div>';
    }
    
    // Logic Ikon Sidebar
    var iconName = node.icon || (node.level === 0 ? 'fa-folder' : 'fa-file-lines');
    if (isExpanded && node.level === 0 && (!node.icon || node.icon === 'fa-folder')) {
      iconName = 'fa-folder-open';
    }
    var iconColor = node.level === 0 ? 'text-warning' : 'text-secondary';
    
    html += '<i class="fa-solid ' + iconName + ' mx-2 ' + iconColor + ' tree-node-icon"></i>';
    html += '<span class="tree-node-title flex-grow-1" title="' + escapeHTML(node.title) + '">' + escapeHTML(node.title) + '</span>';
    html += '</div>';'''

    assert old_render_node in content, f'old_render_node not found in {filename}'
    content = content.replace(old_render_node, new_render_node)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Successfully updated responsive sidebar in {filename}')

update_responsive_sidebar('index.html')
update_responsive_sidebar('Kit-Naf.html')
