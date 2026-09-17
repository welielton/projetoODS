from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
target = root / 'public/entrega/codigo-fonte.zip'
excluded = {'.git', '.agents', '.codex', 'node_modules', 'dist', 'test-results', 'playwright-report', '__pycache__'}
with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob('*')):
        rel = path.relative_to(root)
        if not path.is_file() or any(part in excluded for part in rel.parts):
            continue
        if path == target or path.name.startswith('.env') or path.suffix in {'.zip', '.tar', '.gz'}:
            continue
        archive.write(path, Path('conecta-voluntario') / rel)
print(f'Código-fonte empacotado: {target} ({target.stat().st_size} bytes)')
