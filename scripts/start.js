#!/usr/bin/env node

/**
 * Poll App Development Server Start Script
 *
 * This script provides a comprehensive development environment startup with:
 * - Environment validation (Node.js version, dependencies, project structure)
 * - Code quality checks (TypeScript, ESLint)
 * - Cross-platform compatibility (Windows, macOS, Linux)
 * - Graceful shutdown handling
 *
 * Usage:
 *   node scripts/start.js              # Full checks + development server
 *   node scripts/start.js --skip-checks # Skip checks, start server immediately
 *   npm run dev                        # Same as full checks
 *   npm run dev:fast                   # Direct Next.js start (fastest)
 *
 * Features:
 * - ✅ Node.js version validation (18+)
 * - ✅ Project structure verification
 * - ✅ Dependencies check
 * - ✅ TypeScript compilation check
 * - ✅ ESLint validation
 * - ✅ Infinite loop protection (fixed)
 * - ✅ Cross-platform spawn handling
 * - ✅ Graceful shutdown on SIGINT/SIGTERM
 *
 * @version 2.0.0
 * @author Poll App Team
 */

const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

const log = {
  success: msg => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: msg => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: msg => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: msg => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: msg =>
    console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}\n`),
}

function checkNodeVersion() {
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

  if (majorVersion < 18) {
    log.error(
      `Node.js version ${nodeVersion} is not supported. Please upgrade to Node.js 18 or higher.`
    )
    return false
  }

  log.success(`Node.js version ${nodeVersion} ✓`)
  return true
}

function checkPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(packagePath)) {
    log.error('package.json not found')
    return false
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    log.success(`Project: ${packageJson.name} v${packageJson.version}`)
    return true
  } catch (error) {
    log.error('Invalid package.json')
    return false
  }
}

function checkDependencies() {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules')

  if (!fs.existsSync(nodeModulesPath)) {
    log.warning('node_modules not found. Run "npm install" first.')
    return false
  }

  log.success('Dependencies installed ✓')
  return true
}

function runTypeCheck() {
  try {
    log.info('Running TypeScript type check...')
    const isWindows = os.platform() === 'win32'
    const command = isWindows ? 'npm.cmd' : 'npm'
    execSync(`${command} run type-check`, { stdio: 'pipe' })
    log.success('TypeScript check passed ✓')
    return true
  } catch (error) {
    log.warning(
      'TypeScript check failed. Run "npm run type-check" to see details.'
    )
    return false
  }
}

function runLinting() {
  try {
    log.info('Running ESLint check...')
    const isWindows = os.platform() === 'win32'
    const command = isWindows ? 'npm.cmd' : 'npm'
    execSync(`${command} run lint:check`, { stdio: 'pipe' })
    log.success('Linting check passed ✓')
    return true
  } catch (error) {
    log.warning(
      'Linting issues found. Run "npm run lint" to fix automatically.'
    )
    return false
  }
}

function checkProjectStructure() {
  const requiredPaths = [
    'src',
    'src/app',
    'src/components',
    'src/lib',
    'src/types',
    'public',
    'tailwind.config.ts',
    'tsconfig.json',
    'next.config.ts',
  ]

  let allGood = true

  for (const reqPath of requiredPaths) {
    if (!fs.existsSync(path.join(process.cwd(), reqPath))) {
      log.error(`Missing required path: ${reqPath}`)
      allGood = false
    }
  }

  if (allGood) {
    log.success('Project structure valid ✓')
  }

  return allGood
}

function displayProjectInfo() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  console.log(`
${colors.bold}${colors.magenta}📊 Poll App - Next.js Polling Platform${colors.reset}
${colors.cyan}════════════════════════════════════════════════${colors.reset}

${colors.bold}Project Overview:${colors.reset}
• Modern polling application with real-time results
• Built with Next.js 15, TypeScript, and Tailwind CSS
• Responsive design with mobile-first approach
• QR code sharing and analytics dashboard

${colors.bold}Available Features:${colors.reset}
• ✅ Poll creation with multiple options
• ✅ Real-time voting and results
• ✅ QR code generation for sharing
• ✅ Responsive design system
• ✅ User authentication (mock)
• ✅ Analytics and visualizations

${colors.bold}Development URLs:${colors.reset}
• Local:     http://localhost:3000
• Network:   Available on your local network

${colors.bold}Quick Commands:${colors.reset}
• ${colors.green}npm run dev${colors.reset}        - Start development server
• ${colors.green}npm run build${colors.reset}      - Build for production
• ${colors.green}npm run lint${colors.reset}       - Fix code issues
• ${colors.green}npm run type-check${colors.reset} - Check TypeScript

${colors.cyan}════════════════════════════════════════════════${colors.reset}
`)
}

function startDevServer(skipChecks = false) {
  log.header('🚀 Starting Poll App Development Server')

  if (!skipChecks) {
    // Run all checks
    const checks = [
      { name: 'Node.js version', fn: checkNodeVersion },
      { name: 'Package.json', fn: checkPackageJson },
      { name: 'Dependencies', fn: checkDependencies },
      { name: 'Project structure', fn: checkProjectStructure },
    ]

    let allPassed = true

    for (const check of checks) {
      if (!check.fn()) {
        allPassed = false
      }
    }

    // Optional checks (won't block startup)
    log.info('\nRunning optional quality checks...')
    runTypeCheck()
    runLinting()

    if (!allPassed) {
      log.error('\nSome critical checks failed. Please fix the issues above.')
      process.exit(1)
    }
  }

  displayProjectInfo()

  log.info('Starting Next.js development server...\n')

  // Cross-platform command setup
  const isWindows = os.platform() === 'win32'
  const command = isWindows ? 'npx.cmd' : 'npx'

  // Start the development server directly with Next.js
  const server = spawn(command, ['next', 'dev', '--port', '3000'], {
    stdio: 'inherit',
    shell: isWindows,
    env: { ...process.env, FORCE_COLOR: '1' }
  })

  server.on('error', (error) => {
    log.error(`Failed to start development server: ${error.message}`)
    process.exit(1)
  })

  server.on('close', code => {
    if (code !== 0 && code !== null) {
      log.error(`Development server exited with code ${code}`)
      process.exit(code)
    } else {
      log.info('Development server stopped')
    }
  })

  // Handle graceful shutdown
  const shutdown = (signal) => {
    log.info(`\nReceived ${signal}. Shutting down development server...`)
    if (server && !server.killed) {
      server.kill(signal)
      setTimeout(() => {
        if (!server.killed) {
          log.warning('Force killing development server...')
          server.kill('SIGKILL')
        }
      }, 5000)
    }
    process.exit(0)
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))

  // Prevent the script from exiting immediately
  process.on('exit', () => {
    if (server && !server.killed) {
      server.kill('SIGKILL')
    }
  })
}

// Parse command line arguments
const args = process.argv.slice(2)
const skipChecks = args.includes('--skip-checks') || args.includes('-s')
const helpRequested = args.includes('--help') || args.includes('-h')

if (helpRequested) {
  console.log(`
${colors.bold}${colors.cyan}Poll App Development Server Start Script v2.0.0${colors.reset}

${colors.bold}DESCRIPTION:${colors.reset}
  Comprehensive development environment with quality checks and validation.
  Fixed infinite loop issue and added cross-platform compatibility.

${colors.bold}USAGE:${colors.reset}
  node scripts/start.js [options]

${colors.bold}OPTIONS:${colors.reset}
  -h, --help         Show this detailed help message
  -s, --skip-checks  Skip all quality checks and start server immediately

${colors.bold}EXAMPLES:${colors.reset}
  ${colors.green}node scripts/start.js${colors.reset}              # Full validation + dev server (recommended)
  ${colors.green}node scripts/start.js --skip-checks${colors.reset} # Skip checks, start fast
  ${colors.green}npm run dev${colors.reset}                        # Same as full validation
  ${colors.green}npm run dev:fast${colors.reset}                   # Direct Next.js start (fastest)

${colors.bold}QUALITY CHECKS PERFORMED:${colors.reset}
  • Node.js version validation (18+ required)
  • Project structure verification
  • Dependencies installation check
  • TypeScript compilation validation
  • ESLint code quality check

${colors.bold}FIXES APPLIED:${colors.reset}
  ✅ Infinite loop issue resolved
  ✅ Cross-platform compatibility added
  ✅ Graceful shutdown handling
  ✅ Deprecation warnings fixed
  ✅ Error handling improved

${colors.bold}SUPPORTED PLATFORMS:${colors.reset}
  • Windows (win32)
  • macOS (darwin)
  • Linux (linux)

For more information, visit the project documentation.
`)
  process.exit(0)
}

// Main execution
if (require.main === module) {
  startDevServer(skipChecks)
}

module.exports = {
  startDevServer,
  checkNodeVersion,
  checkPackageJson,
  checkDependencies,
  runTypeCheck,
  runLinting,
  checkProjectStructure,
}
