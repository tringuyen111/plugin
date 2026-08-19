# SDLC Intelligence Marketplace

Repository này cung cấp marketplace local cho Codex và workspace plugin cho ChatGPT.

## Plugin hiện tại

- Technical ID: `sdlc-intelligence-deep`
- Display name: `SDLC Intelligence`
- Version: `1.0.32`
- Marketplace manifest: `.agents/plugins/marketplace.json`
- Plugin package: `plugins/sdlc-intelligence-deep/`
- Loại package: Skill-only; không có MCP server, `.mcp.json` hoặc `.app.json`.

## Import vào ChatGPT web

Tính năng này cần workspace ChatGPT đủ điều kiện và quyền quản trị/import plugin.

1. Merge thay đổi plugin vào nhánh mặc định của repository GitHub `tringuyen111/plugin`.
2. Mở ChatGPT web → **Workspace settings → Plugins**.
3. Chọn **Import from GitHub** và import toàn bộ repository `tringuyen111/plugin`.
4. Chờ validation hoàn tất; mở plugin **SDLC Intelligence**.
5. Chọn installation policy **Available** hoặc **Installed** cho role cần dùng.
6. Mở một chat mới, chọn plugin trong menu công cụ hoặc gọi `@SDLC Intelligence`.
7. Khi repository có bản cập nhật, chọn **Refresh** trên workspace plugin rồi mở chat mới.

Plugin chỉ chứa Skills nên không cần kết nối OAuth, app hoặc MCP riêng. Khả năng cài và sử dụng vẫn phụ thuộc plan, workspace, role và surface ChatGPT.

Tài liệu chính thức: [Plugins in ChatGPT and Codex](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt-and-codex).

## Phạm vi repository

Marketplace chỉ trỏ tới `plugins/sdlc-intelligence-deep/`. Các thư mục `connectors/` và `.ai-router/` là dữ liệu local ngoài package, không được đưa vào commit marketplace này và không ảnh hưởng tới plugin import.
